#!/usr/bin/env node

/**
 * Icon Reorganization and Normalization Script
 * 
 * This script:
 * 1. Creates outline/ and duotone/ directories
 * 2. Moves icons to appropriate directories based on triage
 * 3. Normalizes all icons to 512x512 viewBox
 * 4. Ensures consistent formatting
 * 5. Generates a migration report
 */

const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '../../../src/telerik-icons');
const SOLID_DIR = path.join(ICONS_DIR, 'solid');
const OUTLINE_DIR = path.join(ICONS_DIR, 'outline');
const DUOTONE_DIR = path.join(ICONS_DIR, 'duotone');
const TRIAGE_REPORT = path.join(ICONS_DIR, 'icon-triage-report.json');

// Read triage report
console.log('📖 Reading triage report...\n');
const triage = JSON.parse(fs.readFileSync(TRIAGE_REPORT, 'utf8'));

// Create directories
console.log('📁 Creating directory structure...');
[OUTLINE_DIR, DUOTONE_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`  ✅ Created: ${path.basename(dir)}/`);
  } else {
    console.log(`  ℹ️  Already exists: ${path.basename(dir)}/`);
  }
});

console.log('\n🔧 Normalizing icons...\n');

const stats = {
  normalized: 0,
  moved: { outline: 0, duotone: 0 },
  errors: []
};

function normalizeSVG(content, iconName) {
  // Remove XML declaration if present
  content = content.replace(/<\?xml[^>]*\?>\s*/g, '');
  
  // Extract the SVG content
  const svgMatch = content.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  if (!svgMatch) {
    throw new Error('Invalid SVG: No <svg> tag found');
  }
  
  const svgInnerContent = svgMatch[1];
  
  // Build normalized SVG
  const normalizedSVG = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
${svgInnerContent.trim()}
</svg>
`;
  
  return normalizedSVG;
}

// Process all solid icons
console.log('Processing solid icons...');
triage.solid.forEach(icon => {
  try {
    const content = fs.readFileSync(icon.path, 'utf8');
    const normalized = normalizeSVG(content, icon.name);
    fs.writeFileSync(icon.path, normalized, 'utf8');
    stats.normalized++;
    
    if (stats.normalized % 100 === 0) {
      console.log(`  Normalized ${stats.normalized} icons...`);
    }
  } catch (error) {
    stats.errors.push({
      file: icon.name,
      error: error.message
    });
  }
});

// Move outline icons
if (triage.outline.length > 0) {
  console.log(`\nMoving ${triage.outline.length} outline icons...`);
  triage.outline.forEach(icon => {
    try {
      const content = fs.readFileSync(icon.path, 'utf8');
      const normalized = normalizeSVG(content, icon.name);
      const newPath = path.join(OUTLINE_DIR, `${icon.name}.svg`);
      fs.writeFileSync(newPath, normalized, 'utf8');
      fs.unlinkSync(icon.path);
      stats.moved.outline++;
    } catch (error) {
      stats.errors.push({
        file: icon.name,
        error: error.message
      });
    }
  });
}

// Move duotone icons
if (triage.duotone.length > 0) {
  console.log(`\nMoving ${triage.duotone.length} duotone icons...`);
  triage.duotone.forEach(icon => {
    try {
      const content = fs.readFileSync(icon.path, 'utf8');
      const normalized = normalizeSVG(content, icon.name);
      const newPath = path.join(DUOTONE_DIR, `${icon.name}.svg`);
      fs.writeFileSync(newPath, normalized, 'utf8');
      fs.unlinkSync(icon.path);
      stats.moved.duotone++;
    } catch (error) {
      stats.errors.push({
        file: icon.name,
        error: error.message
      });
    }
  });
}

// Report
console.log('\n📊 Reorganization Complete!\n');
console.log('================\n');
console.log(`Normalized: ${stats.normalized} icons`);
console.log(`Moved to outline/: ${stats.moved.outline} icons`);
console.log(`Moved to duotone/: ${stats.moved.duotone} icons`);
console.log(`Errors: ${stats.errors.length}\n`);

if (stats.errors.length > 0) {
  console.log('❌ Errors:');
  stats.errors.forEach(e => console.log(`  - ${e.file}: ${e.error}`));
  console.log();
}

// Save migration report
const reportPath = path.join(ICONS_DIR, 'reorganization-report.json');
fs.writeFileSync(reportPath, JSON.stringify({
  timestamp: new Date().toISOString(),
  stats,
  structure: {
    solid: triage.solid.length,
    outline: triage.outline.length,
    duotone: triage.duotone.length
  }
}, null, 2));

console.log(`✅ Migration report saved to: ${reportPath}\n`);
console.log('🎉 All icons normalized and organized!\n');
