/*
 * Layout audit: measures a rendered page and reports what is crooked.
 *
 * This file is one JavaScript expression. Evaluate it in the page with any
 * tool that can run script there (a browser tool's evaluate call, Playwright
 * page.evaluate, the DevTools console) and read the returned object, which is
 * also left on window.__layoutAudit. scripts/layout-audit.mjs does this in
 * headless Chrome at several widths.
 *
 * It reads only: no DOM or style changes. Measure the page at rest, after
 * fonts and images load and with animations finished or reduced motion on,
 * because a transform in flight moves the boxes being measured.
 *
 * Three attributes in the page talk to it. data-lead marks the one element the
 * reader must see first, and the audit checks that the render agrees.
 * data-mark goes on a chart mark whose size or position encodes a value (a bar,
 * a stacked segment): its edges and heights are data, so they are not compared
 * with layout lines. Put it on the mark only, never on the track or the axis
 * that holds it, so a chart whose rows use different scales is still caught.
 * data-audit-ignore skips a subtree entirely. Both are counted in the summary.
 */
(() => {
  'use strict';

  const SAME = 0.75; // px. Smaller differences are sub-pixel rounding.
  const NEAR_EDGE = 4; // px. Two edges this close are a mistake, not a decision.
  const NEAR_GAP = 3.25; // px. Steps on a 4px scale differ by at least 4.
  const STRUCTURAL = 160; // px. Narrower boxes do not own a right-hand column line.
  const CAP = 8; // findings reported per check
  const MAX_NODES = 8000;

  const doc = document;
  const root = doc.documentElement;
  const vw = root.clientWidth;
  const vh = window.innerHeight;
  const sx = window.scrollX;
  const sy = window.scrollY;

  const SKIP = new Set(['SCRIPT', 'STYLE', 'LINK', 'META', 'HEAD', 'TITLE', 'BR', 'WBR', 'OPTION', 'TEMPLATE', 'NOSCRIPT']);
  const SOLID = new Set(['IMG', 'SVG', 'VIDEO', 'CANVAS', 'TABLE', 'INPUT', 'BUTTON', 'SELECT', 'TEXTAREA', 'PRE', 'HR', 'IFRAME']);

  const MEDIA = new Set(['IMG', 'SVG', 'VIDEO', 'CANVAS', 'IFRAME', 'HR']);

  const round = (n) => Math.round(n * 10) / 10;
  const px = (v) => parseFloat(v) || 0;

  const alpha = (color) => {
    if (!color || color === 'transparent') return 0;
    const rgb = color.match(/^rgba?\(([^)]+)\)$/);
    if (rgb) {
      const parts = rgb[1].split(/[\s,/]+/).filter(Boolean);
      return parts.length > 3 ? parseFloat(parts[3]) : 1;
    }
    const slash = color.match(/\/\s*([\d.]+%?)\s*\)$/);
    if (slash) return slash[1].endsWith('%') ? parseFloat(slash[1]) / 100 : parseFloat(slash[1]);
    return 1;
  };

  // ---- collect visible elements -------------------------------------------

  const info = new Map();
  const list = [];
  let ignored = 0;
  let marks = 0;
  let truncated = false;

  const bodyRect = doc.body.getBoundingClientRect();
  const bodyIt = {
    el: doc.body, cs: getComputedStyle(doc.body), tag: 'BODY', parent: null, kids: [],
    l: bodyRect.left + sx, t: bodyRect.top + sy, r: bodyRect.right + sx, b: bodyRect.bottom + sy,
    w: bodyRect.width, h: bodyRect.height, abs: false, clipped: false, box: false, mark: false,
  };
  info.set(doc.body, bodyIt);

  const layoutParent = (el) => {
    for (let p = el.parentElement; p; p = p.parentElement) {
      const it = info.get(p);
      if (it) return it;
    }
    return bodyIt;
  };

  const paintsBox = (tag, cs) => {
    if (SOLID.has(tag)) return true;
    if (alpha(cs.backgroundColor) > 0 || cs.backgroundImage !== 'none' || cs.boxShadow !== 'none') return true;
    for (const side of ['Top', 'Right', 'Bottom', 'Left']) {
      if (px(cs[`border${side}Width`]) > 0 && cs[`border${side}Style`] !== 'none' && alpha(cs[`border${side}Color`]) > 0) return true;
    }
    return false;
  };

  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT, {
    acceptNode(el) {
      if (SKIP.has(el.tagName.toUpperCase()) || el.ownerSVGElement) return NodeFilter.FILTER_REJECT;
      if (el.hasAttribute('data-audit-ignore')) { ignored += 1; return NodeFilter.FILTER_REJECT; }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  for (let el = walker.nextNode(); el; el = walker.nextNode()) {
    if (list.length >= MAX_NODES) { truncated = true; break; }
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility !== 'visible') continue;
    // Content of a closed <details> still has boxes, but it is not rendered.
    if (el.checkVisibility && !el.checkVisibility()) continue;
    const q = el.getBoundingClientRect();
    if (q.width < 1 || q.height < 1) continue;
    const tag = el.tagName.toUpperCase();
    const parent = layoutParent(el);
    const it = {
      el, cs, tag, parent, kids: [],
      l: q.left + sx, t: q.top + sy, r: q.right + sx, b: q.bottom + sy, w: q.width, h: q.height,
      out: cs.position === 'absolute' || cs.position === 'fixed',
      abs: cs.position === 'absolute' || parent.abs,
      clipped: parent.clipped || (parent !== bodyIt && parent.cs.overflowX !== 'visible'),
      box: paintsBox(tag, cs),
      mark: parent.mark || el.hasAttribute('data-mark'),
    };
    if (it.mark && !parent.mark) marks += 1;
    info.set(el, it);
    list.push(it);
    parent.kids.push(it);
  }

  const flow = (it) => it.kids.filter((k) => !k.out);

  const hasDirectText = (el) => {
    for (const n of el.childNodes) if (n.nodeType === 3 && n.nodeValue.trim()) return true;
    return false;
  };

  // ---- describing an element in a finding ---------------------------------

  const segment = (el) => {
    const tag = el.tagName.toLowerCase();
    if (el.id) return `${tag}#${el.id}`;
    const cls = (el.getAttribute('class') || '').trim().split(/\s+/).filter(Boolean).slice(0, 2);
    let out = tag + (cls.length ? `.${cls.join('.')}` : '');
    const p = el.parentElement;
    if (p) {
      const same = Array.from(p.children).filter((c) => c.tagName === el.tagName);
      if (same.length > 1) out += `:nth-of-type(${same.indexOf(el) + 1})`;
    }
    return out;
  };

  const where = (it) => {
    const parts = [];
    for (let el = it.el, i = 0; el && el !== doc.body && i < 3; el = el.parentElement, i += 1) {
      parts.unshift(segment(el));
      if (el.id) break;
    }
    const text = (it.el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40);
    return parts.join(' > ') + (text ? ` "${text}"` : '');
  };

  const findings = [];
  const counts = {};
  const report = (check, severity, message, fix, extra) => {
    counts[check] = (counts[check] || 0) + 1;
    if (counts[check] <= CAP) findings.push({ check, severity, message, fix, ...extra });
  };

  // ---- rows: siblings that sit side by side -------------------------------

  const rowsOf = (items) => {
    const rows = [];
    for (const k of [...items].sort((a, b) => a.t - b.t || a.l - b.l)) {
      const row = rows[rows.length - 1];
      const joins = row && row.every((m) => Math.min(m.b, k.b) - Math.max(m.t, k.t) > 0.5 * Math.min(m.h, k.h));
      if (joins) row.push(k); else rows.push([k]);
    }
    for (const row of rows) row.sort((a, b) => a.l - b.l);
    return rows;
  };

  const rowCache = new Map();
  const rows = (it) => {
    if (!rowCache.has(it)) rowCache.set(it, rowsOf(flow(it)));
    return rowCache.get(it);
  };

  // ---- which edges are decisions ------------------------------------------
  // An edge counts only when layout put it there. A chip that follows another
  // chip, or a block centred by its parent, starts wherever content left it.

  const neighbour = (it, side) => {
    for (const s of flow(it.parent)) {
      if (s === it) continue;
      if (Math.min(s.b, it.b) - Math.max(s.t, it.t) <= 0.5 * Math.min(s.h, it.h)) continue;
      if (side === 'L' ? s.l < it.l - SAME : s.r > it.r + SAME) return true;
    }
    return false;
  };

  const contentEdge = (p, side) => (side === 'L'
    ? p.l + px(p.cs.borderLeftWidth) + px(p.cs.paddingLeft)
    : p.r - px(p.cs.borderRightWidth) - px(p.cs.paddingRight));

  const localAnchor = (it, side) => {
    const p = it.parent;
    if (!p) return true;
    // An inline box that follows text on its line (a tag after a label) starts where the text ends.
    if (side === 'L' && /^inline/.test(it.cs.display)) {
      for (let n = it.el.previousSibling; n && n.nodeType !== 1; n = n.previousSibling) {
        if (n.nodeType === 3 && n.nodeValue.trim()) return false;
      }
    }
    const display = p.cs.display;
    if (display.includes('grid')) {
      const self = it.cs.justifySelf === 'auto' ? p.cs.justifyItems : it.cs.justifySelf;
      if (/center|end|right/.test(self)) return false;
      return side === 'L' || !/start|left/.test(self);
    }
    if (display === 'table-row') return true;
    if (display.includes('flex')) {
      if (p.cs.flexDirection.startsWith('column')) {
        const align = it.cs.alignSelf === 'auto' ? p.cs.alignItems : it.cs.alignSelf;
        if (/center|end/.test(align)) return false;
        return side === 'L' || /normal|stretch/.test(align) || Math.abs(it.r - contentEdge(p, 'R')) <= NEAR_EDGE + 2;
      }
      if (px(it.cs.flexGrow) > 0) return true;
      const justify = p.cs.justifyContent;
      if (/center|space-around|space-evenly/.test(justify)) return false;
      if (side === 'L') {
        if (/end|right/.test(justify)) return false;
        return !neighbour(it, 'L') || /px|%/.test(it.cs.flexBasis);
      }
      if (neighbour(it, 'R')) return /px|%/.test(it.cs.flexBasis);
      return Math.abs(it.r - contentEdge(p, 'R')) <= NEAR_EDGE + 2;
    }
    if (side === 'L') return !neighbour(it, 'L');
    // A block in normal flow fills its container or carries a stated width;
    // an inline or floated box ends wherever its content does.
    return !neighbour(it, 'R') && it.cs.float === 'none' && /^(block|flex|grid|flow-root|list-item)$/.test(it.cs.display);
  };

  const anchorCache = { L: new Map(), R: new Map() };
  const anchored = (it, side) => {
    if (it === bodyIt) return true;
    const cache = anchorCache[side];
    if (!cache.has(it)) cache.set(it, localAnchor(it, side) && anchored(it.parent, side));
    return cache.get(it);
  };

  // An element sitting 0-4px inside a painted ancestor's edge reads as that
  // ancestor's edge (an image flush against a card border), so it adds none.
  const absorbed = (it, x, side) => {
    for (let p = it.parent; p && p !== bodyIt; p = p.parent) {
      const d = side === 'L' ? x - p.l : p.r - x;
      if (d > NEAR_EDGE) return false;
      if (p.box && d > SAME) return true;
    }
    return false;
  };

  const firstLine = (el) => {
    const range = doc.createRange();
    range.selectNodeContents(el);
    let first = null;
    let right = 0;
    for (const q of range.getClientRects()) {
      if (q.width < 0.5 || q.height < 0.5) continue;
      if (!first) { first = q; right = q.right; continue; }
      if (q.top < first.bottom - 1 && q.bottom > first.top + 1) right = Math.max(right, q.right); else break;
    }
    return first ? { l: first.left + sx, r: right + sx } : null;
  };

  const textSide = (cs) => {
    const a = cs.textAlign;
    if (a.includes('center')) return null;
    if (/flex|grid/.test(cs.display) && !/^(normal|start|flex-start|left|stretch)$/.test(cs.justifyContent)) return null;
    if (/grid/.test(cs.display) && /center/.test(cs.justifyItems)) return null;
    if (/flex/.test(cs.display) && cs.flexDirection.startsWith('column') && /center/.test(cs.alignItems)) return null;
    const rtl = cs.direction === 'rtl';
    if (a === 'right' || (a === 'end' && !rtl) || (a === 'start' && rtl)) return 'R';
    return 'L';
  };

  const pools = { L: [], R: [] };
  const addEdge = (it, x, side, kind) => {
    if (x <= SAME || x >= vw - SAME) return; // the viewport edge is not a column line
    if (absorbed(it, x, side)) return;
    pools[side].push({ x, it, kind, size: px(it.cs.fontSize) });
  };

  for (const it of list) {
    if (it.abs || it.mark) continue;
    // Cell borders and fills run into the next cell, so a cell shows no edge of its own.
    if (it.box && it.cs.display !== 'table-cell') {
      if (anchored(it, 'L')) addEdge(it, it.l, 'L', 'box');
      if (it.w >= STRUCTURAL && anchored(it, 'R')) addEdge(it, it.r, 'R', 'box');
    }
    if (!/^inline/.test(it.cs.display) && hasDirectText(it.el)) {
      const side = textSide(it.cs);
      if (!side || !anchored(it, side)) continue;
      const line = firstLine(it.el);
      if (line) addEdge(it, side === 'L' ? line.l : line.r, side, 'text');
    }
  }

  const cluster = (pool) => {
    const out = [];
    for (const e of [...pool].sort((a, b) => a.x - b.x)) {
      const c = out[out.length - 1];
      if (c && e.x - c.x <= SAME) c.items.push(e); else out.push({ x: e.x, items: [e] });
    }
    return out;
  };

  const nested = (a, b) => a.el.contains(b.el) || b.el.contains(a.el);
  // Large type is often nudged a pixel or two so its ink, not its box, sits on
  // the column line. Two text edges at very different sizes may be that.
  const optical = (p, q) => p.kind === 'text' && q.kind === 'text'
    && Math.max(p.size, q.size) >= 1.5 * Math.min(p.size, q.size);
  const closePair = (a, b) => {
    let fallback = null;
    for (const p of a.items.slice(0, 60)) {
      for (const q of b.items.slice(0, 60)) {
        if (nested(p.it, q.it) || Math.abs(p.it.t - q.it.t) > 1.5 * vh) continue;
        if (!optical(p, q)) return [p, q];
        fallback = fallback || [p, q];
      }
    }
    return fallback;
  };

  const clusters = { L: cluster(pools.L), R: cluster(pools.R) };
  for (const side of ['L', 'R']) {
    const cs = clusters[side];
    for (let i = 0; i + 1 < cs.length; i += 1) {
      const d = cs[i + 1].x - cs[i].x;
      if (d <= SAME || d > NEAR_EDGE) continue;
      const pair = closePair(cs[i], cs[i + 1]);
      if (!pair) continue;
      const name = side === 'L' ? 'left' : 'right';
      const maybeOptical = optical(pair[0], pair[1]);
      report('edge-near-miss', maybeOptical ? 'warn' : 'error',
        `Two ${name} edges are ${round(d)}px apart: x=${round(cs[i].x)} (${cs[i].items.length} elements) and x=${round(cs[i + 1].x)} (${cs[i + 1].items.length}).`
          + (maybeOptical ? ' The type sizes differ a lot, so this may be an optical correction: confirm by eye that the ink lines up.' : ''),
        'Put both on one column line. Usual causes: a stray margin, padding that differs between siblings, or a border on one box and not the other.',
        { delta: round(d), where: pair.map((e) => where(e.it)) });
    }
  }

  // ---- rows: tops, baselines, heights, inner row lines --------------------

  const canvas = doc.createElement('canvas').getContext('2d');
  const ascents = new Map();
  const ascent = (cs) => {
    const font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    if (!ascents.has(font)) {
      canvas.font = font;
      const m = canvas.measureText('Hxg');
      ascents.set(font, m.fontBoundingBoxAscent || m.actualBoundingBoxAscent || 0);
    }
    return ascents.get(font);
  };

  // The first line of text in an element: its baseline and its vertical centre.
  const lineCache = new Map();
  const firstTextLine = (it) => {
    if (lineCache.has(it)) return lineCache.get(it);
    let found = null;
    const tw = doc.createTreeWalker(it.el, NodeFilter.SHOW_TEXT);
    for (let n = tw.nextNode(); n && !found; n = tw.nextNode()) {
      if (!n.nodeValue.trim() || !n.parentElement) continue;
      const range = doc.createRange();
      range.selectNodeContents(n);
      for (const q of range.getClientRects()) {
        if (q.width <= 0.5 || q.height <= 0.5) continue;
        found = { base: q.top + sy + ascent(getComputedStyle(n.parentElement)), mid: (q.top + q.bottom) / 2 + sy };
        break;
      }
    }
    lineCache.set(it, found);
    return found;
  };
  const baseline = (it) => (firstTextLine(it) ? firstTextLine(it).base : null);
  // Where an item sits for "icon beside the first line" alignment.
  const lineCentre = (it) => (firstTextLine(it) ? firstTextLine(it).mid : (it.t + it.b) / 2);

  const alike = (a, b) => a.tag === b.tag && a.el.className === b.el.className;
  const spread = (values) => Math.max(...values) - Math.min(...values);

  for (const p of [bodyIt, ...list]) {
    if (!/flex|grid/.test(p.cs.display) || flow(p).length < 2) continue;
    for (const full of rows(p)) {
      const row = full.filter((k) => !k.mark);
      if (row.length < 2) continue;
      const ref = row[0];
      const refBase = baseline(ref);

      const off = [];
      for (const k of row.slice(1)) {
        const diffs = [k.t - ref.t, k.b - ref.b, (k.t + k.b) / 2 - (ref.t + ref.b) / 2].map(Math.abs);
        const kBase = baseline(k);
        const baseDiff = refBase !== null && kBase !== null ? Math.abs(kBase - refBase) : Infinity;
        // An icon or avatar centred on the first line of the text beside it is aligned.
        const lineDiff = MEDIA.has(k.tag) || MEDIA.has(ref.tag) ? Math.abs(lineCentre(k) - lineCentre(ref)) : Infinity;
        if (diffs.some((d) => d <= SAME) || baseDiff <= 1.25 || lineDiff <= 1.25) continue;
        const least = Math.min(...diffs, baseDiff, lineDiff);
        if (least <= NEAR_EDGE) off.push({ k, least });
      }
      if (off.length) {
        const worst = off.reduce((a, b) => (b.least > a.least ? b : a));
        report('row-near-miss', 'error',
          `Items in one row miss a shared top, centre, bottom, and baseline by ${round(worst.least)}px.`,
          'Align the row on one line with align-items (start, center, or baseline) and remove the per-item nudge.',
          { delta: round(worst.least), where: [where(ref), ...off.slice(0, 2).map((o) => where(o.k))] });
      }

      // An icon beside a label is centred, not matched in height.
      const boxes = row.filter((k) => k.box && !MEDIA.has(k.tag));
      for (let i = 0; i + 1 < boxes.length; i += 1) {
        const d = Math.abs(boxes[i].h - boxes[i + 1].h);
        if (d > SAME && d <= NEAR_EDGE) {
          report('near-equal-heights', 'error',
            `Two boxes side by side differ in height by ${round(d)}px.`,
            'Give them one height. The usual cause is a border on one and not the other: use the same border width on both, transparent where it should not show.',
            { delta: round(d), where: [where(boxes[i]), where(boxes[i + 1])] });
        }
      }

      const same = row.every((k) => alike(k, ref));
      if (!same) continue;

      if (row.every((k) => k.box) && spread(row.map((k) => k.h)) > NEAR_EDGE) {
        report('ragged-row-heights', 'warn',
          `Sibling blocks in one row have different heights (${row.map((k) => round(k.h)).join(', ')}px).`,
          'Let the row stretch its items (align-items: stretch is the default) so the bottoms share a line.',
          { delta: round(spread(row.map((k) => k.h))), where: row.slice(0, 3).map(where) });
      }

      const inner = row.map((k) => flow(k));
      const n = inner[0].length;
      const stacks = n >= 2 && inner.every((kids, i) => kids.length === n && rows(row[i]).length === n);
      if (!stacks || spread(row.map((k) => k.t)) > SAME) continue;
      let worstIndex = -1;
      let worstSpread = 0;
      for (let i = 0; i < n; i += 1) {
        const s = spread(inner.map((kids) => kids[i].t));
        if (s > worstSpread) { worstSpread = s; worstIndex = i; }
      }
      if (worstSpread > SAME) {
        report('ragged-inner-rows', worstSpread <= NEAR_EDGE ? 'error' : 'warn',
          `Sibling blocks in one row do not share inner row lines: child ${worstIndex + 1} starts ${round(worstSpread)}px apart across them.`,
          'Make the parent a grid and each block grid-template-rows: subgrid with grid-row: span N, so titles, text, and actions line up across the row.',
          { delta: round(worstSpread), where: row.slice(0, 3).map((k) => where(inner[row.indexOf(k)][worstIndex])) });
      }
    }
  }

  // ---- gaps that are almost equal -----------------------------------------

  const gapTally = new Map();
  const nearGaps = (gaps) => {
    const sorted = [...new Set(gaps.map((g) => Math.round(g * 2) / 2))].sort((a, b) => a - b);
    for (let i = 0; i + 1 < sorted.length; i += 1) {
      const d = sorted[i + 1] - sorted[i];
      if (d > SAME && d <= NEAR_GAP) return [sorted[i], sorted[i + 1]];
    }
    return null;
  };

  for (const p of [bodyIt, ...list]) {
    const kids = flow(p);
    if (kids.length < 3 || hasDirectText(p.el) || kids.some((k) => k.mark)) continue;
    const rs = rows(p);
    if (rs.length === kids.length) {
      const gaps = [];
      for (let i = 0; i + 1 < rs.length; i += 1) {
        const g = rs[i + 1][0].t - rs[i][0].b;
        if (g >= 0) { gaps.push(g); const key = Math.round(g); gapTally.set(key, (gapTally.get(key) || 0) + 1); }
      }
      const pair = nearGaps(gaps);
      if (pair) {
        report('gap-near-miss', 'error',
          `Vertical gaps of ${pair[0]}px and ${pair[1]}px sit in one stack.`,
          'Use one step of the spacing scale for both, or make them clearly different steps.',
          { delta: round(pair[1] - pair[0]), where: [where(p)] });
      }
    }
    for (const row of rs) {
      if (row.length < 3) continue;
      const gaps = [];
      for (let i = 0; i + 1 < row.length; i += 1) {
        const g = row[i + 1].l - row[i].r;
        if (g >= 0) gaps.push(g);
      }
      const pair = nearGaps(gaps);
      if (pair) {
        report('gap-near-miss', 'error',
          `Horizontal gaps of ${pair[0]}px and ${pair[1]}px sit in one row.`,
          'Space the row with one gap value on the parent instead of per-item margins.',
          { delta: round(pair[1] - pair[0]), where: [where(row[0]), where(row[row.length - 1])] });
      }
    }
  }

  // ---- overflow and clipping ----------------------------------------------

  const docWidth = Math.max(root.scrollWidth, doc.body.scrollWidth);
  if (docWidth > vw + 1) {
    const wide = list.filter((it) => !it.clipped && (it.r > vw + 1
      || (it.cs.overflowX === 'visible' && it.l + it.el.scrollWidth > vw + 1)));
    const innermost = wide.filter((it) => !it.kids.some((k) => wide.includes(k))).sort((a, b) => b.r - a.r);
    report('horizontal-overflow', 'error',
      `The page scrolls sideways: content is ${round(docWidth)}px wide in a ${vw}px viewport.`,
      'Give wide tables, code, and media their own overflow-x: auto wrapper, set min-width: 0 on grid and flex children, and let long words wrap.',
      { delta: round(docWidth - vw), where: innermost.slice(0, 4).map(where) });
  }

  for (const it of list) {
    if (it.w < 8 || !hasDirectText(it.el)) continue;
    // Text hidden on purpose until focus (a skip link) is not a truncation.
    if (it.cs.opacity === '0' || it.cs.clipPath !== 'none' || (it.cs.clip && it.cs.clip !== 'auto')) continue;
    const el = it.el;
    if (/hidden|clip/.test(it.cs.overflowX) && el.scrollWidth > el.clientWidth + 1 && it.cs.textOverflow !== 'ellipsis') {
      report('clipped-text', 'error',
        `Text is cut off horizontally (${el.scrollWidth}px of content in ${el.clientWidth}px).`,
        'Let it wrap, widen the box, or truncate on purpose with text-overflow: ellipsis and a way to read the full value.',
        { delta: el.scrollWidth - el.clientWidth, where: [where(it)] });
    } else if (/hidden|clip/.test(it.cs.overflowY) && el.scrollHeight > el.clientHeight + 1
      && (it.cs.getPropertyValue('-webkit-line-clamp') || 'none') === 'none') {
      report('clipped-text', 'warn',
        `Text is cut off vertically (${el.scrollHeight}px of content in ${el.clientHeight}px).`,
        'Remove the fixed height or clamp lines on purpose.',
        { delta: el.scrollHeight - el.clientHeight, where: [where(it)] });
    }
  }

  // ---- pointer targets ----------------------------------------------------

  const TARGETS = 'a[href], button, select, textarea, summary, input:not([type="hidden"]), [role="button"], [role="link"], [role="tab"], [role="switch"], [role="checkbox"], [tabindex]:not([tabindex="-1"])';
  for (const it of list) {
    if (!it.el.matches(TARGETS) || (it.w >= 24 && it.h >= 24)) continue;
    // A link inside a sentence is sized by its line; a labelled checkbox or
    // radio borrows the label as its target.
    if (it.cs.display === 'inline' && it.el.parentElement && hasDirectText(it.el.parentElement)) continue;
    if (it.tag === 'INPUT' && it.el.labels && it.el.labels.length) continue;
    report('small-target', 'warn',
      `A pointer target is ${round(it.w)} by ${round(it.h)}px.`,
      'Make it at least 24 by 24px (44 for touch-first surfaces) with padding or min-height, without changing how large it looks if the design needs it small.',
      { where: [where(it)] });
  }

  // ---- page margins -------------------------------------------------------

  let minLeft = Infinity;
  let maxRight = -Infinity;
  for (const it of list) {
    if (it.abs || it.clipped) continue;
    if (it.l > SAME && it.l < minLeft) minLeft = it.l;
    if (it.r < vw - SAME && it.r > maxRight) maxRight = it.r;
  }
  if (Number.isFinite(minLeft) && Number.isFinite(maxRight)) {
    const d = Math.abs(minLeft - (vw - maxRight));
    if (d > SAME && d <= 12) {
      report('margin-asymmetry', 'warn',
        `Page margins are ${round(minLeft)}px on the left and ${round(vw - maxRight)}px on the right.`,
        'Centre the container with margin-inline: auto and equal padding, or make the asymmetry large enough to read as intended.',
        { delta: round(d), where: [] });
    }
  }

  // ---- type scale ---------------------------------------------------------

  const sizes = new Map();
  let firstViewLargest = null;
  for (const it of list) {
    let chars = 0;
    for (const n of it.el.childNodes) if (n.nodeType === 3) chars += n.nodeValue.trim().length;
    if (!chars) continue;
    const size = round(px(it.cs.fontSize));
    sizes.set(size, (sizes.get(size) || 0) + chars);
    if (it.t - sy < vh && chars >= 2 && (!firstViewLargest || size > firstViewLargest.size)) firstViewLargest = { size, it };
  }
  const scale = [...sizes.entries()].sort((a, b) => a[0] - b[0]);
  if (scale.length) {
    const body = scale.reduce((a, b) => (b[1] > a[1] ? b : a))[0];
    const close = [];
    for (let i = 0; i + 1 < scale.length; i += 1) {
      if (scale[i + 1][0] / scale[i][0] < 1.1) close.push(`${scale[i][0]}px and ${scale[i + 1][0]}px`);
    }
    if (close.length) {
      report('type-sizes-too-close', 'warn',
        `Font sizes too close to read as different levels: ${close.join('; ')}.`,
        'Merge each pair into one size, or separate them by a real step of the type scale (1.2x or more).',
        { where: [] });
    }
    if (scale.length > 7) {
      report('type-scale-sprawl', 'warn',
        `${scale.length} font sizes are in use: ${scale.map((s) => s[0]).join(', ')}px.`,
        'Cut to five to seven sizes, each with a role.',
        { where: [] });
    }
    if (firstViewLargest && firstViewLargest.size / body < 1.5) {
      report('flat-hierarchy', 'warn',
        `Nothing leads the first screen: the largest text is ${firstViewLargest.size}px against ${body}px body text.`,
        'Decide what the reader must see first and give it clear dominance in size, weight, or space.',
        { where: [where(firstViewLargest.it)] });
    }
  }

  // ---- the lead -----------------------------------------------------------
  // The brief names one thing the reader must see first; the page marks it with
  // data-lead. These checks ask whether the rendered page agrees.

  const leadEl = doc.querySelector('[data-lead]');
  const lead = leadEl ? info.get(leadEl) : null;
  if (leadEl && !lead) {
    report('lead-missing', 'error', 'The element marked data-lead is not visible.',
      'Show the lead, or move data-lead to the element that carries the point of the page.', { where: [] });
  }
  if (lead) {
    if (lead.t - sy >= vh) {
      report('lead-below-fold', 'warn',
        `The lead starts ${round(lead.t - sy)}px down, below the first ${vh}px screen.`,
        'Move the lead up or shrink what sits above it. Chrome, navigation, and preamble should not come before the point.',
        { where: [where(lead)] });
    }
    if (hasDirectText(leadEl) && firstViewLargest && firstViewLargest.size > px(lead.cs.fontSize) + SAME
      && !leadEl.contains(firstViewLargest.it.el)) {
      report('lead-outranked', 'warn',
        `Text at ${firstViewLargest.size}px on the first screen is larger than the lead at ${round(px(lead.cs.fontSize))}px.`,
        'Give the lead the largest type on the first screen, or mark the element that really is the lead.',
        { where: [where(firstViewLargest.it), where(lead)] });
    }
  }

  // ---- result -------------------------------------------------------------

  const order = { error: 0, warn: 1 };
  findings.sort((a, b) => order[a.severity] - order[b.severity]);
  const hidden = Object.entries(counts).filter(([, n]) => n > CAP).map(([check, n]) => ({ check, more: n - CAP }));

  const result = {
    viewport: { width: vw, height: vh },
    summary: {
      errors: findings.filter((f) => f.severity === 'error').length,
      warnings: findings.filter((f) => f.severity === 'warn').length,
      elements: list.length,
      ignoredSubtrees: ignored,
      dataMarks: marks,
      truncated,
      notShown: hidden,
    },
    findings,
    inventory: {
      // Compare this with the lead named in the brief: it is what a reader sees first.
      lead: lead ? where(lead) : null,
      firstScreenLargestText: firstViewLargest ? { px: firstViewLargest.size, where: where(firstViewLargest.it) } : null,
      leftEdges: clusters.L
        .map((c) => ({ x: round(c.x), count: c.items.length, sample: c.items.length === 1 ? where(c.items[0].it) : undefined }))
        .sort((a, b) => b.count - a.count).slice(0, 12),
      distinctLeftEdges: clusters.L.length,
      singleUseLeftEdges: clusters.L.filter((c) => c.items.length === 1).length,
      fontSizes: scale.map(([size, chars]) => ({ px: size, chars })),
      verticalGaps: [...gapTally.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([gap, count]) => ({ px: gap, count })),
    },
  };

  window.__layoutAudit = result;
  return result;
})()
