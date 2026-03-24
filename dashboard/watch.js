#!/usr/bin/env node
/**
 * File watcher — rebuilds dashboard JSON when source files change.
 * Watches: docs/, research/, discovery/, data/, memory/
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const WATCH_DIRS = [
  path.join(PROJECT_ROOT, 'docs'),
  path.join(PROJECT_ROOT, 'research'),
  path.join(PROJECT_ROOT, 'discovery'),
  path.join(PROJECT_ROOT, 'data'),
  path.join(PROJECT_ROOT, 'memory'),
];
const WATCH_FILES = [
  path.join(PROJECT_ROOT, 'CLAUDE.md'),
  path.join(PROJECT_ROOT, 'STATUS.md'),
];

let debounce = null;

function rebuild() {
  if (debounce) return;
  debounce = setTimeout(() => {
    debounce = null;
    console.log(`\n[${new Date().toLocaleTimeString()}] Change detected — rebuilding...`);
    try {
      execSync('node build-data.js', { cwd: __dirname, stdio: 'inherit' });
      console.log('Rebuild complete. Refresh browser to see changes.\n');
    } catch (e) {
      console.error('Rebuild failed:', e.message);
    }
  }, 500);
}

console.log('Watching for changes in project files...');
console.log('Press Ctrl+C to stop.\n');

for (const dir of WATCH_DIRS) {
  if (fs.existsSync(dir)) {
    fs.watch(dir, { recursive: true }, (event, filename) => {
      if (filename && (filename.endsWith('.md') || filename.endsWith('.csv'))) {
        rebuild();
      }
    });
  }
}

for (const file of WATCH_FILES) {
  if (fs.existsSync(file)) {
    fs.watchFile(file, { interval: 1000 }, rebuild);
  }
}
