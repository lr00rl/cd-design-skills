/*
 * Style probe: reads the visual language of a rendered page, so a reference the
 * user likes can be followed from its real values instead of from a guess.
 *
 * One JavaScript expression, like layout-audit.js: evaluate it in the page with
 * any browser tool, or run `node layout-audit.mjs <url> --probe`. It reads only.
 *
 * It reports what is used and how much: colours weighted by the text or the area
 * that carries them, type faces and sizes weighted by characters, radii, shadows,
 * borders, the page's own custom properties, and the main headings. Read it for
 * roles (ground, ink, one accent, how many sizes), then choose values that suit
 * the new page. Copying a reference's content or brand marks is not the point.
 */
(() => {
  'use strict';
  const visible = (e) => e.getClientRects().length > 0;
  const top = (pairs, n) => {
    const m = new Map();
    for (const [k, w] of pairs) m.set(k, (m.get(k) || 0) + w);
    return [...m].sort((a, b) => b[1] - a[1]).slice(0, n).map(([value, weight]) => ({ value, weight: Math.round(weight) }));
  };
  const text = [], fill = [], face = [], size = [], radius = [], shadow = [], border = [], marks = [];
  for (const e of [...document.querySelectorAll('body *')].filter(visible).slice(0, 8000)) {
    const cs = getComputedStyle(e);
    if (e.ownerSVGElement) {
      for (const k of ['fill', 'stroke']) if (cs[k] && cs[k] !== 'none' && !cs[k].startsWith('rgba(0, 0, 0, 0')) marks.push([cs[k], 1]);
      continue;
    }
    const r = e.getBoundingClientRect();
    let chars = 0;
    for (const n of e.childNodes) if (n.nodeType === 3) chars += n.nodeValue.trim().length;
    if (chars) {
      text.push([cs.color, chars]);
      face.push([cs.fontFamily.split(',')[0].replace(/"/g, '').trim(), chars]);
      size.push([`${cs.fontSize} / ${cs.fontWeight}`, chars]);
    }
    if (cs.backgroundColor !== 'rgba(0, 0, 0, 0)') fill.push([cs.backgroundColor, r.width * r.height]);
    if (cs.backgroundImage !== 'none') fill.push([cs.backgroundImage.slice(0, 90), r.width * r.height]);
    if (cs.borderTopLeftRadius !== '0px') radius.push([cs.borderTopLeftRadius, 1]);
    if (cs.boxShadow !== 'none') shadow.push([cs.boxShadow.slice(0, 120), 1]);
    if (parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== 'none') border.push([`${cs.borderTopWidth} ${cs.borderTopColor}`, 1]);
  }
  const tokens = {};
  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules; } catch { continue; } // a cross-origin sheet cannot be read
    for (const rule of rules) {
      if (!/^(:root|html|body)$/.test(rule.selectorText || '')) continue;
      for (const p of rule.style) if (p.startsWith('--')) tokens[p] = rule.style.getPropertyValue(p).trim().slice(0, 80);
    }
  }
  const heading = (sel) => [...document.querySelectorAll(sel)].filter(visible).slice(0, 2).map((e) => {
    const cs = getComputedStyle(e);
    return { text: e.textContent.trim().slice(0, 48), face: cs.fontFamily.split(',')[0].replace(/"/g, ''), size: cs.fontSize, weight: cs.fontWeight, lineHeight: cs.lineHeight, letterSpacing: cs.letterSpacing, colour: cs.color };
  });
  const body = getComputedStyle(document.body);
  const result = {
    page: { title: document.title, lang: document.documentElement.lang, ground: body.backgroundColor, text: body.color, face: body.fontFamily.slice(0, 120), size: `${body.fontSize} / ${body.lineHeight}` },
    textColours: top(text, 8), fills: top(fill, 10), chartMarks: top(marks, 8),
    faces: top(face, 5), sizes: top(size, 14), radii: top(radius, 8), shadows: top(shadow, 4), borders: top(border, 5),
    headings: { h1: heading('h1'), h2: heading('h2'), h3: heading('h3') },
    tokens,
  };
  window.__styleProbe = result;
  return result;
})()
