#!/usr/bin/env bash
# Symlink every skill in this repo into ~/.claude/skills/ so Claude Code
# auto-discovers them. Re-running is safe (links are refreshed).
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}"

mkdir -p "$TARGET_DIR"

for skill_dir in "$REPO_DIR"/skills/*/; do
  name="$(basename "$skill_dir")"
  [ -f "$skill_dir/SKILL.md" ] || { echo "skip $name (no SKILL.md)"; continue; }
  link="$TARGET_DIR/$name"
  if [ -e "$link" ] && [ ! -L "$link" ]; then
    echo "WARN: $link exists and is not a symlink — remove it manually first"; continue
  fi
  ln -sfn "${skill_dir%/}" "$link"
  echo "linked $name -> ${skill_dir%/}"
done

echo "Done. Restart Claude Code sessions to pick up new skills."
