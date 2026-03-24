#!/usr/bin/env node
/**
 * Build script for {{PROJECT_NAME}} Dashboard
 * Reads project markdown/CSV files (read-only) and outputs JSON to dashboard/data/
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { marked } = require('marked');

// Safety: hardcoded paths
const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(__dirname, 'data');

// Ensure output dir exists and is inside dashboard/
if (!OUTPUT_DIR.startsWith(__dirname)) {
  console.error('SAFETY: Output directory must be inside dashboard/');
  process.exit(1);
}
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ─── Utilities ───────────────────────────────────────────────────────────────

function readFile(relativePath) {
  const full = path.join(PROJECT_ROOT, relativePath);
  try {
    return fs.readFileSync(full, 'utf-8');
  } catch (e) {
    console.warn(`  WARN: Could not read ${relativePath}`);
    return null;
  }
}

function parseMarkdownTables(md) {
  const tables = [];
  const lines = md.split('\n');
  let i = 0;
  while (i < lines.length) {
    if (lines[i].trim().startsWith('|') && i + 1 < lines.length && lines[i + 1].trim().startsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      if (tableLines.length >= 3) {
        const headers = tableLines[0].split('|').map(c => c.trim()).filter(c => c);
        const rows = [];
        for (let r = 2; r < tableLines.length; r++) {
          const cells = tableLines[r].split('|').map(c => c.trim()).filter(c => c);
          if (cells.length > 0 && !cells[0].match(/^[-:]+$/)) {
            const row = {};
            headers.forEach((h, idx) => { row[h] = cells[idx] || ''; });
            rows.push(row);
          }
        }
        if (rows.length > 0) tables.push({ headers, rows });
      }
    } else {
      i++;
    }
  }
  return tables;
}

function splitByHeadings(md, level = 2) {
  const regex = new RegExp(`^${'#'.repeat(level)} (.+)$`, 'gm');
  const sections = {};
  let match;
  const positions = [];
  while ((match = regex.exec(md)) !== null) {
    positions.push({ title: match[1].trim(), start: match.index + match[0].length });
  }
  for (let i = 0; i < positions.length; i++) {
    const end = i + 1 < positions.length ? positions[i + 1].start - positions[i + 1].title.length - level - 2 : md.length;
    const content = md.substring(positions[i].start, end).trim();
    sections[positions[i].title] = content;
  }
  return sections;
}

// ─── Build Overview Data ─────────────────────────────────────────────────────

function buildOverview() {
  console.log('Building overview data...');
  const overview = {
    statusBlurb: '',
    killConditions: [],
    buildTime: new Date().toISOString(),
  };

  // Status blurb
  const blurb = readFile('docs/output/status-blurb.md');
  if (blurb) {
    overview.statusBlurb = blurb
      .replace(/<!--[\s\S]*?-->/g, '')
      .trim();
  }

  // Kill conditions from executive summary
  const execSummary = readFile('docs/executive-summary.md');
  if (execSummary) {
    const tables = parseMarkdownTables(execSummary);
    for (const table of tables) {
      if (table.headers.some(h => h.toLowerCase().includes('condition'))) {
        overview.killConditions = table.rows.map(row => ({
          id: row['KC'] || row['#'] || '',
          condition: row['Condition'] || '',
          status: row['Status'] || 'UNTESTED',
          evidence: row['Key Evidence'] || '',
        }));
        break;
      }
    }
  }

  return overview;
}

// ─── Build Entity Data (from CSV) ───────────────────────────────────────────

function buildEntities() {
  console.log('Building entity data...');
  // Adjust this path to match your CSV source of truth
  const csvPath = 'data/entities.csv';
  const csv = readFile(csvPath);
  if (!csv) {
    console.warn('  No entity CSV found — skipping entity build');
    return [];
  }

  try {
    const records = parse(csv, { columns: true, skip_empty_lines: true, trim: true });
    return records;
  } catch (e) {
    console.error(`  ERROR parsing CSV: ${e.message}`);
    return [];
  }
}

// ─── Build Competitor Data ──────────────────────────────────────────────────

function buildCompetitors() {
  console.log('Building competitor data...');
  const researchMd = readFile('memory/research.md');
  if (!researchMd) return [];

  const tables = parseMarkdownTables(researchMd);
  if (tables.length === 0) return [];

  // Use the first table (capability map)
  return tables[0].rows;
}

// ─── Write Outputs ──────────────────────────────────────────────────────────

function writeJSON(filename, data) {
  const outPath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(`  ✓ ${filename} (${Array.isArray(data) ? data.length + ' items' : 'object'})`);
}

// ─── Main ───────────────────────────────────────────────────────────────────

console.log(`\nBuilding dashboard data for project at ${PROJECT_ROOT}\n`);

const overview = buildOverview();
const entities = buildEntities();
const competitors = buildCompetitors();

writeJSON('overview.json', overview);
writeJSON('entities.json', entities);
writeJSON('competitors.json', competitors);

console.log('\nDone.\n');
