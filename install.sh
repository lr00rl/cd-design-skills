#!/usr/bin/env bash
# Symlink every skill in this repo into the directories agents read skills from:
# ~/.agents/skills (shared by pi, Codex, and other agents that follow that
# convention) and ~/.claude/skills (Claude Code).
#
# Safe to run again: a link that already resolves to the skill is left alone,
# and a link into this repo whose skill no longer exists is removed.
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
TARGETS=("${AGENTS_SKILLS_DIR:-$HOME/.agents/skills}" "${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}")

for target in "${TARGETS[@]}"; do
  mkdir -p "$target"

  for link in "$target"/*; do
    [ -L "$link" ] && [ ! -e "$link" ] || continue
    case "$(readlink "$link")" in
      "$REPO_DIR"/*) rm "$link"; echo "removed stale link $link" ;;
    esac
  done

  for skill_dir in "$REPO_DIR"/skills/*/; do
    skill_dir="${skill_dir%/}"
    name="$(basename "$skill_dir")"
    [ -f "$skill_dir/SKILL.md" ] || { echo "skip $name (no SKILL.md)"; continue; }
    link="$target/$name"
    if [ -e "$link" ] && [ "$(cd "$link" && pwd -P)" = "$skill_dir" ]; then
      continue
    fi
    if [ -e "$link" ] && [ ! -L "$link" ]; then
      echo "WARN: $link exists and is not a symlink; remove it by hand first"; continue
    fi
    ln -sfn "$skill_dir" "$link"
    echo "linked $link -> $skill_dir"
  done
done

echo "Done. Start a new agent session to pick up the skills."
