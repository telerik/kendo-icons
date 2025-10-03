#!/usr/bin/env node

/**
 * Icon Priority Selector
 * 
 * Analyzes icon names and suggests high-priority icons for pilot batch
 * based on common UI patterns and naming conventions
 */

const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '../../../src/telerik-icons/solid');
const OUTPUT_PATH = path.join(__dirname, '../../../src/telerik-icons/pilot-batch-icons.json');

// Priority categories with icon name patterns
const priorities = {
  navigation: {
    weight: 10,
    patterns: ['home', 'menu', 'arrow', 'chevron', 'back', 'forward', 'up', 'down', 'left', 'right', 'navigate'],
    icons: []
  },
  actions: {
    weight: 10,
    patterns: ['add', 'plus', 'minus', 'remove', 'delete', 'close', 'cancel', 'save', 'edit', 'create', 'new'],
    icons: []
  },
  status: {
    weight: 9,
    patterns: ['star', 'heart', 'check', 'done', 'success', 'error', 'warning', 'info', 'alert'],
    icons: []
  },
  media: {
    weight: 8,
    patterns: ['play', 'pause', 'stop', 'volume', 'sound', 'mute', 'video', 'audio', 'image', 'photo'],
    icons: []
  },
  communication: {
    weight: 8,
    patterns: ['mail', 'email', 'message', 'chat', 'phone', 'call', 'notification', 'bell'],
    icons: []
  },
  files: {
    weight: 7,
    patterns: ['file', 'folder', 'document', 'download', 'upload', 'attach', 'pdf'],
    icons: []
  },
  user: {
    weight: 7,
    patterns: ['user', 'person', 'profile', 'account', 'login', 'logout'],
    icons: []
  },
  settings: {
    weight: 6,
    patterns: ['settings', 'config', 'gear', 'cog', 'preferences', 'options'],
    icons: []
  },
  search: {
    weight: 9,
    patterns: ['search', 'find', 'filter', 'sort'],
    icons: []
  },
  basic_shapes: {
    weight: 5,
    patterns: ['circle', 'square', 'triangle', 'rectangle'],
    icons: []
  }
};

// Read all icons
const allIcons = fs.readdirSync(ICONS_DIR)
  .filter(f => f.endsWith('.svg'))
  .map(f => f.replace('.svg', ''));

console.log(`📊 Analyzing ${allIcons.length} icons...\n`);

// Categorize icons
allIcons.forEach(icon => {
  const iconLower = icon.toLowerCase();
  
  for (const [category, data] of Object.entries(priorities)) {
    const matches = data.patterns.some(pattern => 
      iconLower.includes(pattern) || pattern.includes(iconLower)
    );
    
    if (matches) {
      data.icons.push(icon);
    }
  }
});

// Calculate scores
const scored = allIcons.map(icon => {
  let score = 0;
  const categories = [];
  
  for (const [category, data] of Object.entries(priorities)) {
    if (data.icons.includes(icon)) {
      score += data.weight;
      categories.push(category);
    }
  }
  
  // Bonus for short names (usually more generic/common)
  if (icon.length <= 6) score += 2;
  if (icon.length <= 4) score += 3;
  
  // Bonus for simple names (no hyphens = simpler icon)
  const parts = icon.split('-');
  if (parts.length === 1) score += 2;
  
  return {
    name: icon,
    score,
    categories
  };
}).sort((a, b) => b.score - a.score);

// Select top icons
const topIcons = scored.slice(0, 50);

console.log('🎯 Top 50 Priority Icons:\n');
console.log('Rank | Icon Name                       | Score | Categories');
console.log('-----|--------------------------------|-------|------------');

topIcons.forEach((icon, index) => {
  const rank = (index + 1).toString().padStart(2, ' ');
  const name = icon.name.padEnd(30);
  const score = icon.score.toString().padStart(2);
  const cats = icon.categories.join(', ') || 'other';
  console.log(`${rank}.  | ${name} | ${score}   | ${cats}`);
});

// Categorize by complexity for pilot batch
console.log('\n\n📋 Suggested Pilot Batch (30 icons):\n');

const pilotBatch = {
  simple: [],      // 10 icons - basic shapes, minimal paths
  medium: [],      // 15 icons - standard complexity
  complex: []      // 5 icons - detailed, multiple elements
};

// Heuristic categorization by name complexity
topIcons.slice(0, 30).forEach(icon => {
  const parts = icon.name.split('-').length;
  const length = icon.name.length;
  
  if (parts === 1 && length <= 6) {
    pilotBatch.simple.push(icon.name);
  } else if (parts >= 3 || length > 15) {
    pilotBatch.complex.push(icon.name);
  } else {
    pilotBatch.medium.push(icon.name);
  }
});

// Balance categories
while (pilotBatch.simple.length < 10 && pilotBatch.medium.length > 15) {
  pilotBatch.simple.push(pilotBatch.medium.shift());
}
while (pilotBatch.complex.length < 5 && pilotBatch.medium.length > 15) {
  pilotBatch.complex.push(pilotBatch.medium.shift());
}

console.log(`Simple (${pilotBatch.simple.length}):\n  ${pilotBatch.simple.join(', ')}`);
console.log(`\nMedium (${pilotBatch.medium.length}):\n  ${pilotBatch.medium.join(', ')}`);
console.log(`\nComplex (${pilotBatch.complex.length}):\n  ${pilotBatch.complex.join(', ')}`);

// Save selection
const pilotData = {
  timestamp: new Date().toISOString(),
  total: 30,
  categories: pilotBatch,
  allIcons: [...pilotBatch.simple, ...pilotBatch.medium, ...pilotBatch.complex],
  fullList: topIcons.slice(0, 30).map(i => ({
    name: i.name,
    score: i.score,
    categories: i.categories,
    complexity: pilotBatch.simple.includes(i.name) ? 'simple' : 
                pilotBatch.complex.includes(i.name) ? 'complex' : 'medium'
  }))
};

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(pilotData, null, 2));

console.log(`\n\n✅ Pilot batch selection saved to: ${OUTPUT_PATH}`);

// Create category summary
console.log('\n\n📊 Category Distribution:\n');
Object.entries(priorities).forEach(([category, data]) => {
  const count = data.icons.length;
  if (count > 0) {
    console.log(`${category.padEnd(15)}: ${count} icons`);
  }
});

console.log('\n🎯 Next Steps:');
console.log('1. Review pilot-batch-icons.json');
console.log('2. Manually create 5 outline templates');
console.log('3. Manually create 5 duotone templates');
console.log('4. Document style guide based on templates');
console.log('5. Build converter tool');
console.log('6. Complete remaining 25 icons\n');
