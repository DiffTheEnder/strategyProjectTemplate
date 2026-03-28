const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { askQuestions } = require('./prompts');
const { scaffold } = require('./scaffold');

async function main(nameArg) {
  console.log('\n  DS Strategy Stack\n');

  const answers = await askQuestions(nameArg);

  if (!answers.projectName || !answers.projectType || !answers.structure) {
    console.log('Missing required answers. Exiting.');
    process.exit(1);
  }

  const targetDir = path.resolve(process.cwd(), answers.projectName);

  if (fs.existsSync(targetDir)) {
    console.error(`\n  Error: Directory "${answers.projectName}" already exists.\n`);
    process.exit(1);
  }

  // Resolve template directory — when published, it's at cli/template/
  // When running from source, it's the repo root (parent of cli/)
  let templateDir = path.join(__dirname, '..', 'template');
  if (!fs.existsSync(templateDir)) {
    templateDir = path.resolve(__dirname, '..', '..');
  }

  console.log(`\n  Creating project in ${targetDir}\n`);

  const { modules } = scaffold(targetDir, templateDir, {
    projectName: answers.projectName,
    projectType: answers.projectType,
    structure: answers.structure,
  });

  // Git init
  try {
    execSync('git init', { cwd: targetDir, stdio: 'ignore' });
    execSync('git add -A', { cwd: targetDir, stdio: 'ignore' });
    execSync('git commit -m "Initial project from DS Strategy Stack"', {
      cwd: targetDir,
      stdio: 'ignore',
    });
    console.log('  ✓ Git repository initialised');
  } catch {
    console.log('  ⚠ Could not initialise git — you can do this manually');
  }

  // Install dashboard dependencies
  if (modules.dashboard && fs.existsSync(path.join(targetDir, 'dashboard', 'package.json'))) {
    console.log('  ⏳ Installing dashboard dependencies...');
    try {
      execSync('npm install', {
        cwd: path.join(targetDir, 'dashboard'),
        stdio: 'ignore',
      });
      console.log('  ✓ Dashboard dependencies installed');
    } catch {
      console.log('  ⚠ Could not install dashboard deps — run "cd dashboard && npm install" manually');
    }
  }

  console.log(`
  ✅ Project created!

  Next steps:

    cd ${answers.projectName}
    claude
    /onboard

  The /onboard skill will walk you through configuring
  your hypothesis, scoring dimensions, and kill conditions.
`);
}

module.exports = { main };
