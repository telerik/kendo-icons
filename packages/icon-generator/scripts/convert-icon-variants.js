#!/usr/bin/env node
/* eslint-disable no-console, consistent-return, no-nested-ternary */

/**
 * Icon Variant Converter
 *
 * Converts solid SVG icons to outline and duotone variants based on the style guide.
 * Uses pattern matching and heuristics to intelligently transform icon structures.
 */

const fs = require('fs');
const path = require('path');

// Paths
const SOLID_DIR = path.join(__dirname, '../../../src/telerik-icons/solid');
const OUTLINE_DIR = path.join(__dirname, '../../../src/telerik-icons/outline');
const DUOTONE_DIR = path.join(__dirname, '../../../src/telerik-icons/duotone');
const PILOT_BATCH = path.join(__dirname, '../../../src/telerik-icons/pilot-batch-icons.json');

/**
 * Parse SVG content to extract structure
 */
function parseSVG(content) {
    // Extract viewBox
    const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 512 512';

    // Extract all path elements
    const pathMatches = content.matchAll(/<path[^>]*d="([^"]+)"[^>]*\/>/g);
    const paths = Array.from(pathMatches).map(match => ({
        d: match[1],
        full: match[0]
    }));

    // Extract rect elements
    const rectMatches = content.matchAll(/<rect[^>]*\/>/g);
    const rects = Array.from(rectMatches).map(match => match[0]);

    // Extract circle elements
    const circleMatches = content.matchAll(/<circle[^>]*\/>/g);
    const circles = Array.from(circleMatches).map(match => match[0]);

    // Extract polygon elements
    const polygonMatches = content.matchAll(/<polygon[^>]*points="([^"]+)"[^>]*\/>/g);
    const polygons = Array.from(polygonMatches).map(match => ({
        points: match[1],
        full: match[0]
    }));

    return {
        viewBox,
        paths,
        rects,
        circles,
        polygons,
        elementCount: paths.length + rects.length + circles.length + polygons.length
    };
}

/**
 * Analyze icon complexity based on structure
 */
function analyzeComplexity(iconName, structure) {
    const { elementCount, paths } = structure;

    // Check path complexity (number of commands)
    let totalCommands = 0;
    paths.forEach(path => {
        const commands = path.d.match(/[MLHVCSQTAZ]/gi);
        totalCommands += commands ? commands.length : 0;
    });

    // Complexity scoring
    let complexity = 'simple';

    if (elementCount <= 2 && totalCommands <= 10) {
        complexity = 'simple';
    } else if (elementCount <= 5 && totalCommands <= 30) {
        complexity = 'medium';
    } else {
        complexity = 'complex';
    }

    // Adjust based on icon name patterns
    const simplePatterns = [ 'plus', 'minus', 'close', 'check', 'arrow', 'line' ];
    const complexPatterns = [ 'filter', 'editor', 'detailed', 'map' ];

    const nameWords = iconName.toLowerCase().split('-');

    if (simplePatterns.some(p => nameWords.includes(p))) {
        complexity = 'simple';
    } else if (complexPatterns.some(p => nameWords.some(w => w.includes(p)))) {
        complexity = 'complex';
    }

    return {
        complexity,
        strokeWidth: complexity === 'simple' ? 48 : complexity === 'medium' ? 40 : 32
    };
}

/**
 * Generate outline variant from solid icon
 */
function generateOutline(iconName, solidContent) {
    const structure = parseSVG(solidContent);
    const { complexity, strokeWidth } = analyzeComplexity(iconName, structure);

    console.log(`  → ${iconName}: ${complexity} complexity, stroke-width=${strokeWidth}`);

    // For simple icons, try to extract centerlines
    // For complex icons, use the paths as-is with stroke
    const { paths, rects, circles, polygons } = structure;

    let outlinePaths = [];

    // Convert paths to stroked versions
    paths.forEach(path => {
        outlinePaths.push(`    <path d="${path.d}" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`);
    });

    // Convert rects to stroked versions
    rects.forEach(rect => {
        const rectStr = rect.replace('"/>', `" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`);
        outlinePaths.push(`    ${rectStr}`);
    });

    // Convert circles to stroked versions
    circles.forEach(circle => {
        const circleStr = circle.replace('"/>', `" stroke="currentColor" stroke-width="${strokeWidth}" fill="none"/>`);
        outlinePaths.push(`    ${circleStr}`);
    });

    // Convert polygons to stroked versions
    polygons.forEach(polygon => {
        outlinePaths.push(`    <polygon points="${polygon.points}" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`);
    });

    const outlineContent = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="${structure.viewBox}">
${outlinePaths.join('\n')}
</svg>`;

    return outlineContent;
}

/**
 * Split compound path into individual sub-paths
 */
function splitCompoundPath(pathData) {
    // Split by 'M' or 'm' commands (move to), which indicate new sub-paths
    const subPaths = [];
    const parts = pathData.split(/(?=[Mm])/);

    parts.forEach(part => {
        const trimmed = part.trim();
        if (trimmed) {
            subPaths.push(trimmed);
        }
    });

    return subPaths;
}

/**
 * Generate duotone variant from solid icon
 * Strategy: Split elements into background (40%) and foreground (100%)
 */
function generateDuotone(iconName, solidContent) {
    const structure = parseSVG(solidContent);
    const { paths, rects, circles, polygons, elementCount } = structure;

    // Check if we have compound paths (single path with multiple M commands)
    let allSubPaths = [];

    paths.forEach(path => {
        const subPaths = splitCompoundPath(path.d);
        allSubPaths.push(...subPaths.map(sp => ({ type: 'path', d: sp })));
    });

    rects.forEach(r => allSubPaths.push({ type: 'rect', content: r }));
    circles.forEach(c => allSubPaths.push({ type: 'circle', content: c }));
    polygons.forEach(p => allSubPaths.push({ type: 'polygon', points: p.points }));

    const totalParts = allSubPaths.length;
    console.log(`  → ${iconName}: ${totalParts} parts to split (from ${elementCount} elements)`);

    let backgroundElements = [];
    let foregroundElements = [];

    if (totalParts === 1) {
    // Single element: use as background, duplicate for foreground with same path
        backgroundElements = allSubPaths;
        foregroundElements = allSubPaths;
    } else if (totalParts === 2) {
    // Two parts: first = background, second = foreground
        backgroundElements = [ allSubPaths[0] ];
        foregroundElements = [ allSubPaths[1] ];
    } else {
    // Multiple parts: split roughly in half
    // Strategy: larger/outer shapes = background, smaller/inner = foreground
        const midPoint = Math.ceil(totalParts / 2);
        backgroundElements = allSubPaths.slice(0, midPoint);
        foregroundElements = allSubPaths.slice(midPoint);
    }

    // Generate background (40% opacity)
    const backgroundPaths = backgroundElements.map(el => {
        if (el.type === 'path') {
            return `    <path d="${el.d}" fill="currentColor" opacity="0.4"/>`;
        } else if (el.type === 'rect') {
            return `    ${el.content.replace('"/>', '" fill="currentColor" opacity="0.4"/>')}`;
        } else if (el.type === 'circle') {
            return `    ${el.content.replace('"/>', '" fill="currentColor" opacity="0.4"/>')}`;
        } else if (el.type === 'polygon') {
            return `    <polygon points="${el.points}" fill="currentColor" opacity="0.4"/>`;
        }
    });

    // Generate foreground (100% opacity)
    const foregroundPaths = foregroundElements.map(el => {
        if (el.type === 'path') {
            return `    <path d="${el.d}" fill="currentColor"/>`;
        } else if (el.type === 'rect') {
            return `    ${el.content.replace('"/>', '" fill="currentColor"/>')}`;
        } else if (el.type === 'circle') {
            return `    ${el.content.replace('"/>', '" fill="currentColor"/>')}`;
        } else if (el.type === 'polygon') {
            return `    <polygon points="${el.points}" fill="currentColor"/>`;
        }
    });

    const duotoneContent = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="${structure.viewBox}">
  <!-- Background layer (40% opacity) -->
${backgroundPaths.join('\n')}
  <!-- Foreground layer (100% opacity) -->
${foregroundPaths.join('\n')}
</svg>`;

    return duotoneContent;
}

/**
 * Convert a single icon to outline and duotone variants
 */
function convertIcon(iconName) {
    const solidPath = path.join(SOLID_DIR, `${iconName}.svg`);

    if (!fs.existsSync(solidPath)) {
        console.log(`  ⚠️  ${iconName}: solid icon not found`);
        return { success: false, reason: 'not found' };
    }

    const solidContent = fs.readFileSync(solidPath, 'utf8');

    try {
    // Generate outline variant
        console.log(`\n🔄 Converting ${iconName}...`);
        const outlineContent = generateOutline(iconName, solidContent);
        const outlinePath = path.join(OUTLINE_DIR, `${iconName}.svg`);
        fs.writeFileSync(outlinePath, outlineContent);
        console.log(`  ✅ Outline created`);

        // Generate duotone variant
        const duotoneContent = generateDuotone(iconName, solidContent);
        const duotonePath = path.join(DUOTONE_DIR, `${iconName}.svg`);
        fs.writeFileSync(duotonePath, duotoneContent);
        console.log(`  ✅ Duotone created`);

        return { success: true };
    } catch (error) {
        console.log(`  ❌ Error: ${error.message}`);
        return { success: false, reason: error.message };
    }
}

/**
 * Main execution
 */
function main() {
    console.log('🎨 Icon Variant Converter\n');

    // Load pilot batch icons
    const pilotData = JSON.parse(fs.readFileSync(PILOT_BATCH, 'utf8'));
    const iconsToConvert = pilotData.allIcons;

    console.log(`📋 Pilot batch: ${iconsToConvert.length} icons`);
    console.log(`📁 Source: ${SOLID_DIR}`);
    console.log(`📁 Output: ${OUTLINE_DIR}, ${DUOTONE_DIR}\n`);

    // Check if directories exist
    if (!fs.existsSync(OUTLINE_DIR)) {
        fs.mkdirSync(OUTLINE_DIR, { recursive: true });
    }
    if (!fs.existsSync(DUOTONE_DIR)) {
        fs.mkdirSync(DUOTONE_DIR, { recursive: true });
    }

    // Filter out already completed template icons
    const templateIcons = [ 'plus', 'star', 'home', 'menu', 'bell' ];
    const remainingIcons = iconsToConvert.filter(icon => !templateIcons.includes(icon));

    console.log(`✅ Templates already done: ${templateIcons.join(', ')}`);
    console.log(`🔄 Remaining to convert: ${remainingIcons.length} icons\n`);

    // Convert icons
    const results = {
        success: 0,
        failed: 0,
        errors: []
    };

    remainingIcons.forEach((iconName, index) => {
        console.log(`\n[${index + 1}/${remainingIcons.length}] Processing ${iconName}...`);
        const result = convertIcon(iconName);

        if (result.success) {
            results.success++;
        } else {
            results.failed++;
            results.errors.push({ icon: iconName, reason: result.reason });
        }
    });

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 CONVERSION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successful: ${results.success}`);
    console.log(`❌ Failed: ${results.failed}`);
    console.log(`📁 Total variants created: ${results.success * 2} files`);

    if (results.errors.length > 0) {
        console.log('\n❌ Errors:');
        results.errors.forEach(err => {
            console.log(`  - ${err.icon}: ${err.reason}`);
        });
    }

    console.log('\n✨ Conversion complete!\n');
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { convertIcon, generateOutline, generateDuotone };
