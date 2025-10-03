#!/usr/bin/env node
/* eslint-disable no-console, complexity */

/**
 * Icon Triage Script
 *
 * Analyzes all existing SVG icons to:
 * 1. Detect fill style (solid, outline, duotone, mixed)
 * 2. Check dimensions and viewBox consistency
 * 3. Identify icons with multiple fills/strokes
 * 4. Generate triage report
 */

const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '../../../src/telerik-icons/solid');
const OUTPUT_DIR = path.join(__dirname, '../../../src/telerik-icons');

// Analysis results
const analysis = {
    total: 0,
    solid: [],
    outline: [],
    duotone: [],
    mixed: [],
    unknown: [],
    inconsistentDimensions: [],
    noViewBox: [],
    errors: []
};

function analyzeSVG(filePath, fileName) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Extract viewBox
        const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
        const viewBox = viewBoxMatch ? viewBoxMatch[1] : null;

        // Extract width/height
        const widthMatch = content.match(/width="([^"]+)"/);
        const heightMatch = content.match(/height="([^"]+)"/);
        const width = widthMatch ? widthMatch[1] : null;
        const height = heightMatch ? heightMatch[1] : null;

        // Count fills and strokes
        const fillMatches = content.match(/fill="[^"]*"/g) || [];
        const strokeMatches = content.match(/stroke="[^"]*"/g) || [];
        const pathCount = (content.match(/<path/g) || []).length;
        const circleCount = (content.match(/<circle/g) || []).length;
        const rectCount = (content.match(/<rect/g) || []).length;
        const polygonCount = (content.match(/<polygon/g) || []).length;
        const elementCount = pathCount + circleCount + rectCount + polygonCount;

        // Check for fill="none" (outline style)
        const hasSvgFillNone = content.match(/<svg[^>]*fill="none"/);
        const hasPathFillNone = content.includes('<path') && content.includes('fill="none"') && !hasSvgFillNone;
        const hasNoFill = hasPathFillNone;
        const hasStroke = strokeMatches.length > 0;
        const hasExplicitFill = fillMatches.length > 0 && !hasNoFill;

        // Count unique colors (including implicit default fill)
        const colors = new Set();
        const explicitFillColors = new Set();
        fillMatches.forEach(m => {
            const color = m.match(/fill="([^"]*)"/)[1];
            if (color && color !== 'none') {
                colors.add(color);
                explicitFillColors.add(color);
            }
        });
        strokeMatches.forEach(m => {
            const color = m.match(/stroke="([^"]*)"/)[1];
            if (color && color !== 'none') {colors.add(color);}
        });

        // If no explicit fill but has paths/shapes, assume default black fill (solid)
        // But if SVG has fill="none", ignore unless paths have explicit fill
        const hasImplicitFill = elementCount > 0 && !hasNoFill && fillMatches.length === 0 && !hasSvgFillNone;
        const hasFill = hasExplicitFill || hasImplicitFill;

        // Determine style
        let style = 'unknown';
        if (hasNoFill && hasStroke) {
            // Explicitly outline (fill="none" with stroke)
            style = 'outline';
        } else if (explicitFillColors.size >= 2 || (explicitFillColors.size >= 1 && strokeMatches.length > 0 && colors.size >= 2)) {
            // Multiple colors = duotone
            style = 'duotone';
        } else if ((hasFill || explicitFillColors.size > 0) && !hasStroke) {
            // Filled shape without stroke = solid (including SVG with fill="none" but path with fill)
            style = 'solid';
        } else if (hasFill && hasStroke) {
            // Both fill and stroke = mixed
            style = 'mixed';
        } else if (hasStroke && !hasNoFill && !hasFill) {
            // Stroke without explicit fill = outline
            style = 'outline';
        }

        const iconData = {
            name: fileName.replace('.svg', ''),
            path: filePath,
            viewBox,
            width,
            height,
            style,
            elementCount,
            pathCount,
            fillCount: fillMatches.length,
            strokeCount: strokeMatches.length,
            colorCount: colors.size,
            colors: Array.from(colors),
            hasNoFill,
            hasStroke,
            hasFill
        };

        // Categorize
        analysis[style].push(iconData);

        // Check consistency
        if (!viewBox) {
            analysis.noViewBox.push(iconData);
        }
        if (viewBox !== '0 0 512 512' || width !== '512' || height !== '512') {
            analysis.inconsistentDimensions.push(iconData);
        }

        analysis.total++;

    } catch (error) {
        analysis.errors.push({
            file: fileName,
            error: error.message
        });
    }
}

// Process all icons
console.log('🔍 Analyzing icons...\n');

const files = fs.readdirSync(ICONS_DIR).filter(f => f.endsWith('.svg'));

files.forEach(file => {
    const filePath = path.join(ICONS_DIR, file);
    analyzeSVG(filePath, file);
});

// Generate report
console.log('📊 Triage Report\n');
console.log('================\n');
console.log(`Total icons: ${analysis.total}`);
console.log(`Solid icons: ${analysis.solid.length}`);
console.log(`Outline icons: ${analysis.outline.length}`);
console.log(`Duotone icons: ${analysis.duotone.length}`);
console.log(`Mixed style icons: ${analysis.mixed.length}`);
console.log(`Unknown style: ${analysis.unknown ? analysis.unknown.length : 0}`);
console.log(`\nInconsistent dimensions: ${analysis.inconsistentDimensions.length}`);
console.log(`Missing viewBox: ${analysis.noViewBox.length}`);
console.log(`Errors: ${analysis.errors.length}\n`);

// Save detailed report
const reportPath = path.join(OUTPUT_DIR, 'icon-triage-report.json');
fs.writeFileSync(reportPath, JSON.stringify(analysis, null, 2));
console.log(`✅ Detailed report saved to: ${reportPath}\n`);

// Generate summary by category
console.log('📋 Style Distribution:\n');
console.log(`Solid (${analysis.solid.length}):`);
if (analysis.solid.length <= 20) {
    analysis.solid.forEach(icon => console.log(`  - ${icon.name}`));
} else {
    analysis.solid.slice(0, 10).forEach(icon => console.log(`  - ${icon.name}`));
    console.log(`  ... and ${analysis.solid.length - 10} more`);
}

console.log(`\nOutline (${analysis.outline.length}):`);
if (analysis.outline.length <= 20) {
    analysis.outline.forEach(icon => console.log(`  - ${icon.name}`));
} else {
    analysis.outline.slice(0, 10).forEach(icon => console.log(`  - ${icon.name}`));
    console.log(`  ... and ${analysis.outline.length - 10} more`);
}

console.log(`\nDuotone (${analysis.duotone.length}):`);
if (analysis.duotone.length <= 20) {
    analysis.duotone.forEach(icon => console.log(`  - ${icon.name}`));
} else {
    analysis.duotone.slice(0, 10).forEach(icon => console.log(`  - ${icon.name}`));
    console.log(`  ... and ${analysis.duotone.length - 10} more`);
}

console.log(`\nMixed (${analysis.mixed.length}):`);
if (analysis.mixed.length <= 20) {
    analysis.mixed.forEach(icon => console.log(`  - ${icon.name}`));
} else {
    analysis.mixed.slice(0, 10).forEach(icon => console.log(`  - ${icon.name}`));
    console.log(`  ... and ${analysis.mixed.length - 10} more`);
}

if (analysis.inconsistentDimensions.length > 0) {
    console.log(`\n⚠️  Inconsistent Dimensions (${analysis.inconsistentDimensions.length}):`);
    analysis.inconsistentDimensions.slice(0, 10).forEach(icon => {
        console.log(`  - ${icon.name}: ${icon.width}x${icon.height}, viewBox="${icon.viewBox}"`);
    });
    if (analysis.inconsistentDimensions.length > 10) {
        console.log(`  ... and ${analysis.inconsistentDimensions.length - 10} more`);
    }
}

// Create categorization plan
const planPath = path.join(OUTPUT_DIR, 'categorization-plan.json');
const plan = {
    timestamp: new Date().toISOString(),
    summary: {
        total: analysis.total,
        solid: analysis.solid.length,
        outline: analysis.outline.length,
        duotone: analysis.duotone.length,
        mixed: analysis.mixed.length
    },
    actions: {
        moveToOutline: analysis.outline.map(i => i.name),
        moveToDuotone: analysis.duotone.map(i => i.name),
        reviewMixed: analysis.mixed.map(i => i.name),
        normalizeDimensions: analysis.inconsistentDimensions.map(i => i.name)
    },
    recommendations: [
        'Create /outline and /duotone directories',
        'Move outline icons to /outline',
        'Move duotone icons to /duotone',
        'Review mixed style icons manually',
        'Normalize all icons to 512x512 viewBox',
        'Generate missing variants using icon-generator'
    ]
};

fs.writeFileSync(planPath, JSON.stringify(plan, null, 2));
console.log(`\n✅ Categorization plan saved to: ${planPath}\n`);

console.log('🎯 Next Steps:');
console.log('1. Review the triage report');
console.log('2. Create outline/ and duotone/ directories');
console.log('3. Run the reorganization script');
console.log('4. Normalize dimensions');
console.log('5. Generate missing variants\n');
