/**
 * build-all.js — Build all three Phosphor-based variants in a single pass.
 *
 * For each matched icon in phosphor-full-mapping.json:
 *   - Read regular/fill/duotone SVGs from @phosphor-icons/core
 *   - Transform via kendoifyOutline/kendoifySolid/kendoifyDuotone
 *   - Write originals + transformed to src/telerik-icons/
 *
 * Output structure:
 *   src/telerik-icons/
 *     outline/{originals,transformed}/
 *     solid/{originals,transformed}/
 *     duotone/{originals,transformed}/
 */

const fs = require('fs-extra');
const path = require('path');
const colors = require('ansi-colors');
const { kendoifyOutline, kendoifySolid, kendoifyDuotone } = require('./kendoify');

const ROOT = path.resolve(__dirname, '../..');
const MAPPING_PATH = path.resolve(__dirname, 'phosphor-full-mapping.json');

const PHOSPHOR_BASE = path.resolve(ROOT, 'node_modules/@phosphor-icons/core/assets');
const PHOSPHOR_REGULAR_DIR = path.resolve(PHOSPHOR_BASE, 'regular');
const PHOSPHOR_LIGHT_DIR = path.resolve(PHOSPHOR_BASE, 'light');
const PHOSPHOR_FILL_DIR = path.resolve(PHOSPHOR_BASE, 'fill');
const PHOSPHOR_DUOTONE_DIR = path.resolve(PHOSPHOR_BASE, 'duotone');

const OUTPUT_BASE = path.resolve(ROOT, 'src/telerik-icons');

const DIRS = {
    outline: {
        originals: path.resolve(OUTPUT_BASE, 'outline/originals'),
        transformed: path.resolve(OUTPUT_BASE, 'outline/transformed'),
    },
    solid: {
        originals: path.resolve(OUTPUT_BASE, 'solid/originals'),
        transformed: path.resolve(OUTPUT_BASE, 'solid/transformed'),
    },
    duotone: {
        originals: path.resolve(OUTPUT_BASE, 'duotone/originals'),
        transformed: path.resolve(OUTPUT_BASE, 'duotone/transformed'),
    },
};

async function buildAll() {
    console.log(colors.cyan('\n=== Kendo Icons: Phosphor-Based Full Build ===\n'));

    if (!fs.existsSync(MAPPING_PATH)) {
        console.log(colors.red('phosphor-full-mapping.json not found. Run: npm run phosphor:mapping'));
        process.exit(1);
    }

    const mapping = fs.readJsonSync(MAPPING_PATH);
    const matchedIcons = mapping.icons.filter(i => i.status === 'matched');
    const unmatchedIcons = mapping.icons.filter(i => i.status === 'unmatched');

    console.log(`Total icons:   ${mapping.meta.totalIcons}`);
    console.log(`Matched:       ${matchedIcons.length}`);
    console.log(`Unmatched:     ${unmatchedIcons.length}\n`);

    // Ensure output directories
    Object.values(DIRS).forEach(variant => {
        fs.ensureDirSync(variant.originals);
        fs.ensureDirSync(variant.transformed);
    });

    const results = {
        outline: { success: [], failed: [] },
        solid: { success: [], failed: [] },
        duotone: { success: [], failed: [] },
    };

    let processed = 0;
    const total = matchedIcons.length;

    for (const iconDef of matchedIcons) {
        processed++;
        if (processed % 100 === 0 || processed === total) {
            process.stdout.write(`\r  Processing: ${processed}/${total}`);
        }

        // Weight mixing: Phosphor Light for outlines (thinner, more elegant)
        const lightFileName = iconDef.phosphorBase ? `${iconDef.phosphorBase}-light.svg` : null;
        processVariant(iconDef, 'outline', lightFileName, PHOSPHOR_LIGHT_DIR, kendoifyOutline, results.outline);
        processVariant(iconDef, 'solid', iconDef.fillFile, PHOSPHOR_FILL_DIR, kendoifySolid, results.solid);
        processVariant(iconDef, 'duotone', iconDef.duotoneFile, PHOSPHOR_DUOTONE_DIR, kendoifyDuotone, results.duotone);
    }

    console.log('\n');
    printSummary(results, mapping);
}

function processVariant(iconDef, variant, sourceFile, sourceDir, transformFn, variantResults) {
    const { kendoName } = iconDef;

    try {
        if (!sourceFile) {
            variantResults.failed.push({ name: kendoName, error: 'No source file' });
            return;
        }

        const sourcePath = path.resolve(sourceDir, sourceFile);
        if (!fs.existsSync(sourcePath)) {
            variantResults.failed.push({ name: kendoName, error: `Source not found: ${sourceFile}` });
            return;
        }

        const rawSvg = fs.readFileSync(sourcePath, 'utf-8');

        // Copy original
        fs.writeFileSync(
            path.resolve(DIRS[variant].originals, `${kendoName}.svg`),
            rawSvg
        );

        // Transform
        const transformed = transformFn(rawSvg);

        // Write transformed
        fs.writeFileSync(
            path.resolve(DIRS[variant].transformed, `${kendoName}.svg`),
            transformed
        );

        variantResults.success.push(kendoName);
    } catch (err) {
        variantResults.failed.push({ name: kendoName, error: err.message });
    }
}

function printSummary(results, mapping) {
    console.log(colors.cyan('=== Build Summary ===\n'));

    for (const [variant, res] of Object.entries(results)) {
        const status = res.failed.length === 0
            ? colors.green(`${res.success.length} OK`)
            : `${colors.green(res.success.length + ' OK')}, ${colors.red(res.failed.length + ' failed')}`;
        console.log(`  ${variant.padEnd(10)} ${status}`);

        if (res.failed.length > 0 && res.failed.length <= 10) {
            res.failed.forEach(f => {
                console.log(colors.red(`    - ${f.name}: ${f.error}`));
            });
        } else if (res.failed.length > 10) {
            res.failed.slice(0, 5).forEach(f => {
                console.log(colors.red(`    - ${f.name}: ${f.error}`));
            });
            console.log(colors.red(`    ... and ${res.failed.length - 5} more`));
        }
    }

    const unmatchedCount = mapping.meta.stats.unmatched;
    if (unmatchedCount > 0) {
        console.log(colors.yellow(`\n  ${unmatchedCount} unmatched icons skipped (no Phosphor equivalent)`));
    }

    console.log(colors.cyan(`\n  Output: src/telerik-icons/{outline,solid,duotone}/transformed/\n`));
}

buildAll().catch(err => {
    console.error(colors.red(`\nBuild failed: ${err.message}`));
    process.exit(1);
});
