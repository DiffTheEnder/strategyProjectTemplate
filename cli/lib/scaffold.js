const fs = require('fs');
const path = require('path');
const { PROJECT_TYPES } = require('./project-types');

const EXCLUDE_FROM_COPY = [
  '.git',
  'node_modules',
  '.DS_Store',
  'cli',
  '.next',
  '.claude',
  'dashboard/data/overview.json',
  'dashboard/data/entities.json',
  'dashboard/data/competitors.json',
  'dashboard/data/decisions.json',
  'dashboard/data/scoring.json',
  'dashboard/data/timeline.json',
  'dashboard/data/research.json',
  'dashboard/screenshot.png',
  'project.config.json',
  'CONTRIBUTING.md',
  '.github/ISSUE_TEMPLATE',
  '.github/pull_request_template.md',
];

function shouldExclude(relativePath) {
  return EXCLUDE_FROM_COPY.some(ex =>
    relativePath === ex || relativePath.startsWith(ex + '/')
  );
}

function copyDir(src, dest, baseDir) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    const relative = path.relative(baseDir, srcPath);

    if (shouldExclude(relative)) continue;

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, baseDir);
    } else {
      fs.copyFileSync(srcPath, destPath);
      // Preserve executable permissions
      const stat = fs.statSync(srcPath);
      fs.chmodSync(destPath, stat.mode);
    }
  }
}

function removeIfExists(targetDir, relativePath) {
  const full = path.join(targetDir, relativePath);
  if (fs.existsSync(full)) {
    fs.rmSync(full, { recursive: true, force: true });
  }
}

function scaffold(targetDir, templateDir, options) {
  const { projectType, structure, projectName } = options;
  const typeConfig = PROJECT_TYPES[projectType];

  // 1. Copy template
  copyDir(templateDir, targetDir, templateDir);

  // 2. Determine effective module flags
  const modules = {
    discovery: typeConfig.discovery,
    pipeline: typeConfig.pipeline,
    dashboard: typeConfig.dashboard,
  };

  const features = {
    scoring: true,
    killConditions: true,
    evidenceGrading: true,
    weeklyReports: true,
    contextSnapshots: true,
  };

  // 3. Apply structure-level removals
  if (structure === 'minimal') {
    modules.discovery = false;
    modules.pipeline = false;
    modules.dashboard = false;
    features.scoring = false;
    features.killConditions = false;
    features.evidenceGrading = false;
    features.weeklyReports = false;
    features.contextSnapshots = false;

    removeIfExists(targetDir, 'context');
    removeIfExists(targetDir, 'skills/compare-options');
    removeIfExists(targetDir, 'skills/weekly-report');
    removeIfExists(targetDir, 'skills/rebuild-snapshots');
    removeIfExists(targetDir, 'memory/scoring.md');
  }

  if (structure === 'essentials') {
    features.scoring = false;
    features.killConditions = false;
    features.evidenceGrading = false;

    removeIfExists(targetDir, 'memory/scoring.md');
    removeIfExists(targetDir, 'dashboard/scoring.html');
    removeIfExists(targetDir, 'skills/compare-options');
  }

  // 4. Apply module-level removals
  if (!modules.discovery) {
    removeIfExists(targetDir, 'discovery');
    removeIfExists(targetDir, 'memory/discovery.md');
    removeIfExists(targetDir, 'context/pipeline-state.md');
    removeIfExists(targetDir, 'dashboard/pipeline.html');
    removeIfExists(targetDir, 'skills/pipeline-update');
    removeIfExists(targetDir, 'skills/outreach-sequence');
    removeIfExists(targetDir, 'skills/process-call');
  }

  if (!modules.pipeline && modules.discovery) {
    // Pipeline off but discovery might still be on in custom
    removeIfExists(targetDir, 'skills/pipeline-update');
    removeIfExists(targetDir, 'skills/outreach-sequence');
  }

  if (!modules.dashboard) {
    removeIfExists(targetDir, 'dashboard');
  }

  // 5. Remove template-repo-only files
  removeIfExists(targetDir, 'project.config.example.json');
  removeIfExists(targetDir, 'scripts/reset-to-template.sh');
  removeIfExists(targetDir, 'scripts/validate-placeholders.sh');

  // 6. Write project.config.json
  const config = {
    templateVersion: '1.0.0',
    templateSource: 'github.com/DiffTheEnder/DSS-Claude-Stack',
    projectType,
    projectName,
    projectSlug: projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    oneLineDescription: '',
    goal: '',
    team: '',
    scope: '',
    outOfScope: '',
    strategicHypothesis: '',
    icpDescription: '',
    entityType: typeConfig.entityType,
    entityTypePlural: typeConfig.entityType + 's',
    pipelineSourceOfTruth: 'data/entities.csv',
    dashboardUrl: '',
    modules,
    features,
    scoringDimensions: typeConfig.scoringDimensions,
    killConditions: [],
  };

  fs.writeFileSync(
    path.join(targetDir, 'project.config.json'),
    JSON.stringify(config, null, 2) + '\n'
  );

  return { modules, features };
}

module.exports = { scaffold };
