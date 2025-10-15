#!/usr/bin/env node
/* eslint-disable no-console, consistent-return, no-nested-ternary */

/**
 * Full Icon Set Converter
 *
 * Converts all remaining solid icons to outline and duotone variants.
 * Processes in batches with validation and progress reporting.
 */

const fs = require('fs');
const path = require('path');
const { generateOutline, generateDuotone } = require('./convert-icon-variants');

// Paths
const SOLID_DIR = path.join(__dirname, '../../../src/telerik-icons/solid');
const OUTLINE_DIR = path.join(__dirname, '../../../src/telerik-icons/outline');
const DUOTONE_DIR = path.join(__dirname, '../../../src/telerik-icons/duotone');
const PILOT_BATCH = path.join(__dirname, '../../../src/telerik-icons/pilot-batch-icons.json');

const BATCH_SIZE = 100;

/**
 * Get all icon names from solid directory
 */
function getAllIcons() {
    const files = fs.readdirSync(SOLID_DIR);
    return files
        .filter(f => f.endsWith('.svg'))
        .map(f => f.replace('.svg', ''));
}

/**
 * Get icons already processed (pilot batch)
 */
function getProcessedIcons() {
    const pilotData = JSON.parse(fs.readFileSync(PILOT_BATCH, 'utf8'));
    return pilotData.allIcons;
}

/**
 * Convert a single icon
 */
function convertIcon(iconName) {
    const solidPath = path.join(SOLID_DIR, `${iconName}.svg`);

    if (!fs.existsSync(solidPath)) {
        return { success: false, reason: 'not found' };
    }

    const solidContent = fs.readFileSync(solidPath, 'utf8');

    try {
        // Generate outline variant
        const outlineContent = generateOutline(iconName, solidContent);
        const outlinePath = path.join(OUTLINE_DIR, `${iconName}.svg`);
        fs.writeFileSync(outlinePath, outlineContent);

        // Generate duotone variant
        const duotoneContent = generateDuotone(iconName, solidContent);
        const duotonePath = path.join(DUOTONE_DIR, `${iconName}.svg`);
        fs.writeFileSync(duotonePath, duotoneContent);

        return { success: true };
    } catch (error) {
        return { success: false, reason: error.message };
    }
}

/**
 * Process icons in batches
 */
function processBatch(icons, batchNumber, totalBatches) {
    console.log(`\n${'='.repeat(70)}`);
    console.log(`📦 BATCH ${batchNumber}/${totalBatches}: Processing ${icons.length} icons`);
    console.log('='.repeat(70));

    const results = {
        success: 0,
        failed: 0,
        errors: []
    };

    const startTime = Date.now();

    icons.forEach((iconName, index) => {
        process.stdout.write(`\r[${index + 1}/${icons.length}] ${iconName.padEnd(30)} `);

        const result = convertIcon(iconName);

        if (result.success) {
            results.success++;
            process.stdout.write('✅');
        } else {
            results.failed++;
            process.stdout.write('❌');
            results.errors.push({ icon: iconName, reason: result.reason });
        }
    });

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log(`\n\n✅ Batch ${batchNumber} Complete`);
    console.log(`   Success: ${results.success}/${icons.length}`);
    console.log(`   Failed: ${results.failed}`);
    console.log(`   Duration: ${duration}s`);
    console.log(`   Variants Created: ${results.success * 2}`);

    return results;
}

/**
 * Main execution
 */
function main() {
    console.log('🚀 Full Icon Set Converter\n');

    // Get all icons
    const allIcons = getAllIcons();
    const processedIcons = getProcessedIcons();
    const remainingIcons = allIcons.filter(icon => !processedIcons.includes(icon));

    console.log(`📊 Icon Inventory:`);
    console.log(`   Total Icons: ${allIcons.length}`);
    console.log(`   Already Processed (Pilot): ${processedIcons.length}`);
    console.log(`   Remaining to Convert: ${remainingIcons.length}`);
    console.log(`   Target: ${remainingIcons.length * 2} new variant files\n`);

    if (remainingIcons.length === 0) {
        console.log('✨ All icons already converted!\n');
        return;
    }

    // Confirm before proceeding
    console.log(`⚠️  This will generate ${remainingIcons.length * 2} files`);
    console.log(`📁 Output: ${OUTLINE_DIR}, ${DUOTONE_DIR}\n`);

    // Split into batches
    const batches = [];
    for (let i = 0; i < remainingIcons.length; i += BATCH_SIZE) {
        batches.push(remainingIcons.slice(i, i + BATCH_SIZE));
    }

    console.log(`📦 Processing in ${batches.length} batch(es) of up to ${BATCH_SIZE} icons each\n`);

    // Process batches
    const overallResults = {
        success: 0,
        failed: 0,
        errors: [],
        batches: []
    };

    const overallStartTime = Date.now();

    batches.forEach((batch, index) => {
        const batchResults = processBatch(batch, index + 1, batches.length);
        overallResults.success += batchResults.success;
        overallResults.failed += batchResults.failed;
        overallResults.errors.push(...batchResults.errors);
        overallResults.batches.push({
            number: index + 1,
            size: batch.length,
            success: batchResults.success,
            failed: batchResults.failed
        });
    });

    const overallDuration = ((Date.now() - overallStartTime) / 1000).toFixed(1);

    // Final summary
    console.log('\n' + '='.repeat(70));
    console.log('🎉 CONVERSION COMPLETE');
    console.log('='.repeat(70));
    console.log(`✅ Successful: ${overallResults.success}/${remainingIcons.length}`);
    console.log(`❌ Failed: ${overallResults.failed}`);
    console.log(`📁 Variants Created: ${overallResults.success * 2} files`);
    console.log(`⏱️  Total Duration: ${overallDuration}s`);
    console.log(`📊 Success Rate: ${((overallResults.success / remainingIcons.length) * 100).toFixed(1)}%`);

    // Batch breakdown
    console.log(`\n📦 Batch Summary:`);
    overallResults.batches.forEach(batch => {
        const rate = ((batch.success / batch.size) * 100).toFixed(0);
        console.log(`   Batch ${batch.number}: ${batch.success}/${batch.size} (${rate}%)`);
    });

    // Error details
    if (overallResults.errors.length > 0) {
        console.log(`\n❌ Errors (${overallResults.errors.length}):`);
        overallResults.errors.forEach(err => {
            console.log(`   - ${err.icon}: ${err.reason}`);
        });
    }

    // Overall status
    console.log('\n' + '='.repeat(70));
    const totalIcons = allIcons.length;
    const totalConverted = processedIcons.length + overallResults.success;
    const totalVariants = totalIcons * 3;
    const completionRate = ((totalConverted / totalIcons) * 100).toFixed(1);

    console.log('📈 OVERALL PROJECT STATUS');
    console.log('='.repeat(70));
    console.log(`Icons with all variants: ${totalConverted}/${totalIcons} (${completionRate}%)`);
    console.log(`Total variant files: ${totalConverted * 3}/${totalVariants}`);

    if (overallResults.failed === 0) {
        console.log('\n✨ All icons successfully converted!');
        console.log('🎯 Next: Run validation script to verify quality\n');
    } else {
        console.log(`\n⚠️  ${overallResults.failed} icons failed. Review errors above.\n`);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { convertIcon, processBatch };
