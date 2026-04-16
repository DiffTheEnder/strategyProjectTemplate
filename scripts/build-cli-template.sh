#!/bin/bash
# Copies template files into cli/template/ for npm publishing.
# Run from repo root or via cli/package.json prepublishOnly.

set -e

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATE_DIR="$REPO_ROOT/cli/template"

echo "Building CLI template from repo..."

# Clean previous build
rm -rf "$TEMPLATE_DIR"
mkdir -p "$TEMPLATE_DIR"

# Copy everything except excluded paths
rsync -a \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.DS_Store' \
  --exclude='cli' \
  --exclude='.next' \
  --exclude='.claude' \
  --exclude='dashboard/data/*.json' \
  --exclude='dashboard/screenshot.png' \
  --exclude='/project.config.json' \
  --exclude='CONTRIBUTING.md' \
  --exclude='.github/ISSUE_TEMPLATE' \
  --exclude='.github/pull_request_template.md' \
  "$REPO_ROOT/" "$TEMPLATE_DIR/"

echo "✓ Template built at cli/template/"
