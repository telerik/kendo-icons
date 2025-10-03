#!/usr/bin/env node
/* eslint-disable no-console, complexity, no-unused-vars, no-nested-ternary */

/**
 * Icon Quality Validation Script
 *
 * Validates generated outline and duotone variants against style guide specifications.
 */const fs = require('fs');
const path = require('path');

// Paths
const SOLID_DIR = path.join(__dirname, '../../../src/telerik-icons/solid');
const OUTLINE_DIR = path.join(__dirname, '../../../src/telerik-icons/outline');
const DUOTONE_DIR = path.join(__dirname, '../../../src/telerik-icons/duotone');
const PILOT_BATCH = path.join(__dirname, '../../../src/telerik-icons/pilot-batch-icons.json');

/**
 * Validation rules based on style guide
 */
const VALIDATION_RULES = {
    common: {
        viewBox: '0 0 512 512',
        width: '512',
        height: '512',
        xmlns: 'http://www.w3.org/2000/svg'
    },
    outline: {
        requiredAttributes: [ 'stroke', 'fill' ],
        fillValue: 'none',
        strokeValue: 'currentColor',
        strokeWidths: [ 32, 40, 48 ],
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    duotone: {
        opacityValues: [ '0.4', '1', '1.0' ],
        fillValue: 'currentColor',
        minLayers: 2
    }
};

/**
 * Parse and validate SVG content
 */
function validateSVG(content, variant, iconName) {
    const errors = [];
    const warnings = [];

    // Check XML declaration
    if (!content.includes('<?xml version="1.0" encoding="utf-8"?>')) {
        warnings.push('Missing XML declaration');
    }

    // Check viewBox
    const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
    if (!viewBoxMatch) {
        errors.push('Missing viewBox attribute');
    } else if (viewBoxMatch[1] !== VALIDATION_RULES.common.viewBox) {
        errors.push(`Invalid viewBox: ${viewBoxMatch[1]}, expected ${VALIDATION_RULES.common.viewBox}`);
    }

    // Check dimensions
    const widthMatch = content.match(/width="([^"]+)"/);
    const heightMatch = content.match(/height="([^"]+)"/);
    if (!widthMatch || widthMatch[1] !== VALIDATION_RULES.common.width) {
        errors.push(`Invalid width: ${widthMatch ? widthMatch[1] : 'missing'}`);
    }
    if (!heightMatch || heightMatch[1] !== VALIDATION_RULES.common.height) {
        errors.push(`Invalid height: ${heightMatch ? heightMatch[1] : 'missing'}`);
    }

    // Check xmlns
    if (!content.includes(`xmlns="${VALIDATION_RULES.common.xmlns}"`)) {
        errors.push('Missing or invalid xmlns attribute');
    }

    // Variant-specific validation
    if (variant === 'outline') {
        // Check for stroke attributes
        if (!content.includes('stroke="currentColor"')) {
            errors.push('Missing stroke="currentColor"');
        }
        if (!content.includes('fill="none"')) {
            errors.push('Missing fill="none"');
        }

        // Check stroke width
        const strokeWidthMatch = content.match(/stroke-width="(\d+)"/);
        if (!strokeWidthMatch) {
            errors.push('Missing stroke-width attribute');
        } else {
            const width = parseInt(strokeWidthMatch[1], 10);
            if (!VALIDATION_RULES.outline.strokeWidths.includes(width)) {
                warnings.push(`Unusual stroke-width: ${width} (expected 32, 40, or 48)`);
            }
        }

        // Check linecap and linejoin
        if (!content.includes('stroke-linecap="round"')) {
            warnings.push('Missing stroke-linecap="round"');
        }
        if (!content.includes('stroke-linejoin="round"')) {
            warnings.push('Missing stroke-linejoin="round"');
        }
    } else if (variant === 'duotone') {
        // Check for currentColor
        if (!content.includes('fill="currentColor"')) {
            errors.push('Missing fill="currentColor"');
        }

        // Check for opacity layers
        const opacityMatches = content.match(/opacity="([^"]+)"/g) || [];
        if (opacityMatches.length === 0) {
            errors.push('No opacity attributes found (duotone should have background at 0.4)');
        }

        // Check for 0.4 opacity
        if (!content.includes('opacity="0.4"')) {
            errors.push('Missing background layer with opacity="0.4"');
        }

        // Count elements
        const pathCount = (content.match(/<path/g) || []).length;
        const rectCount = (content.match(/<rect/g) || []).length;
        const circleCount = (content.match(/<circle/g) || []).length;
        const polygonCount = (content.match(/<polygon/g) || []).length;
        const totalElements = pathCount + rectCount + circleCount + polygonCount;

        if (totalElements < VALIDATION_RULES.duotone.minLayers) {
            warnings.push(`Only ${totalElements} element(s) found, duotone should have at least 2 layers`);
        }
    }

    return { errors, warnings };
}

/**
 * Validate all icons in pilot batch
 */
function main() {
    console.log('🔍 Icon Quality Validation\n');

    // Load pilot batch
    const pilotData = JSON.parse(fs.readFileSync(PILOT_BATCH, 'utf8'));
    const icons = pilotData.allIcons;

    console.log(`📋 Validating ${icons.length} icons × 3 variants = ${icons.length * 3} files\n`);

    const results = {
        solid: { pass: 0, fail: 0, warnings: 0 },
        outline: { pass: 0, fail: 0, warnings: 0 },
        duotone: { pass: 0, fail: 0, warnings: 0 }
    };

    const issues = [];

    icons.forEach(iconName => {
        // Validate each variant
        [ 'solid', 'outline', 'duotone' ].forEach(variant => {
            const dir = variant === 'solid' ? SOLID_DIR : variant === 'outline' ? OUTLINE_DIR : DUOTONE_DIR;
            const filePath = path.join(dir, `${iconName}.svg`);

            if (!fs.existsSync(filePath)) {
                issues.push({ icon: iconName, variant, type: 'error', message: 'File not found' });
                results[variant].fail++;
                return;
            }

            const content = fs.readFileSync(filePath, 'utf8');
            const validation = validateSVG(content, variant, iconName);

            if (validation.errors.length > 0) {
                results[variant].fail++;
                validation.errors.forEach(error => {
                    issues.push({ icon: iconName, variant, type: 'error', message: error });
                });
            } else {
                results[variant].pass++;
            }

            if (validation.warnings.length > 0) {
                results[variant].warnings += validation.warnings.length;
                validation.warnings.forEach(warning => {
                    issues.push({ icon: iconName, variant, type: 'warning', message: warning });
                });
            }
        });
    });

    // Print summary
    console.log('='.repeat(70));
    console.log('📊 VALIDATION SUMMARY');
    console.log('='.repeat(70));

    [ 'solid', 'outline', 'duotone' ].forEach(variant => {
        const { pass, fail, warnings } = results[variant];
        const total = pass + fail;
        const passRate = ((pass / total) * 100).toFixed(1);

        console.log(`\n${variant.toUpperCase()}:`);
        console.log(`  ✅ Passed: ${pass}/${total} (${passRate}%)`);
        if (fail > 0) {
            console.log(`  ❌ Failed: ${fail}`);
        }
        if (warnings > 0) {
            console.log(`  ⚠️  Warnings: ${warnings}`);
        }
    });

    // Print issues
    if (issues.length > 0) {
        console.log('\n' + '='.repeat(70));
        console.log('🔍 DETAILED ISSUES');
        console.log('='.repeat(70));

        const errors = issues.filter(i => i.type === 'error');
        const warnings = issues.filter(i => i.type === 'warning');

        if (errors.length > 0) {
            console.log('\n❌ ERRORS:');
            errors.forEach(issue => {
                console.log(`  ${issue.icon} (${issue.variant}): ${issue.message}`);
            });
        }

        if (warnings.length > 0) {
            console.log('\n⚠️  WARNINGS:');
            const uniqueWarnings = {};
            warnings.forEach(issue => {
                const key = `${issue.variant}: ${issue.message}`;
                if (!uniqueWarnings[key]) {
                    uniqueWarnings[key] = [];
                }
                uniqueWarnings[key].push(issue.icon);
            });

            Object.entries(uniqueWarnings).forEach(([ warning, icons ]) => {
                console.log(`  ${warning}`);
                console.log(`    Affects ${icons.length} icon(s): ${icons.slice(0, 5).join(', ')}${icons.length > 5 ? '...' : ''}`);
            });
        }
    }

    // Overall status
    const totalPass = results.solid.pass + results.outline.pass + results.duotone.pass;
    const totalFail = results.solid.fail + results.outline.fail + results.duotone.fail;
    const totalWarnings = results.solid.warnings + results.outline.warnings + results.duotone.warnings;
    const overallPassRate = ((totalPass / (totalPass + totalFail)) * 100).toFixed(1);

    console.log('\n' + '='.repeat(70));
    console.log('🎯 OVERALL STATUS');
    console.log('='.repeat(70));
    console.log(`Pass Rate: ${overallPassRate}% (${totalPass}/${totalPass + totalFail})`);
    console.log(`Errors: ${totalFail}`);
    console.log(`Warnings: ${totalWarnings}`);

    if (totalFail === 0 && totalWarnings === 0) {
        console.log('\n✨ All icons passed validation! Ready for scale-up.\n');
    } else if (totalFail === 0) {
        console.log('\n✅ All icons passed with warnings. Review warnings before scale-up.\n');
    } else {
        console.log('\n⚠️  Some icons failed validation. Review errors before scale-up.\n');
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { validateSVG };
