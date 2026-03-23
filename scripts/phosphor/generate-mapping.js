/**
 * generate-mapping.js — Phosphor-only icon mapping.
 *
 * Reuses the existing phosphor-mapping.json (from the Lucide-based pipeline)
 * as a seed, and extends each entry to also resolve the Phosphor regular
 * (outline) file. For the 57 previously-unmatched icons, attempts additional
 * matching strategies against Phosphor's ~1,248 icon names.
 *
 * Output: scripts/phosphor/phosphor-full-mapping.json
 */

const fs = require('fs-extra');
const path = require('path');
const colors = require('ansi-colors');

const ROOT = path.resolve(__dirname, '../..');
const EXISTING_MAPPING_PATH = path.resolve(__dirname, 'phosphor-seed-mapping.json');
const ICONS_JSON_PATH = path.resolve(ROOT, 'src/telerik-icons/icons.json');
const OUTPUT_PATH = path.resolve(__dirname, 'phosphor-full-mapping.json');

const PHOSPHOR_BASE = path.resolve(ROOT, 'node_modules/@phosphor-icons/core/assets');
const PHOSPHOR_REGULAR_DIR = path.resolve(PHOSPHOR_BASE, 'regular');
const PHOSPHOR_FILL_DIR = path.resolve(PHOSPHOR_BASE, 'fill');
const PHOSPHOR_DUOTONE_DIR = path.resolve(PHOSPHOR_BASE, 'duotone');

// ---------------------------------------------------------------------------
// Additional Kendo→Phosphor mappings for previously-unmatched icons.
// These are icons that the Lucide→Phosphor cross-reference couldn't resolve.
// ---------------------------------------------------------------------------
const KENDO_TO_PHOSPHOR_EXTRA = {
    // Layout alignment (no direct Phosphor match, but try closest)
    'align-self-start': 'align-top',
    'align-self-end': 'align-bottom',
    'align-self-start-alt': 'align-left',
    'align-self-end-alt': 'align-right',
    'align-self-stretch': 'arrows-out-line-vertical',
    'align-self-stretch-alt': 'arrows-out-line-horizontal',
    'align-items-start': 'align-top',
    'align-items-end': 'align-bottom',
    'align-items-stretch': 'arrows-out-line-vertical',
    'align-items-baseline': 'align-top',
    'align-items-start-alt': 'align-left',
    'align-items-end-alt': 'align-right',
    'align-items-stretch-alt': 'arrows-out-line-horizontal',
    'align-items-baseline-alt': 'align-left',
    'justify-content-start': 'align-left',
    'justify-content-center': 'align-center-horizontal',
    'justify-content-end': 'align-right',
    'justify-content-between': 'arrows-out-line-horizontal',
    'justify-content-around': 'arrows-out-line-horizontal',
    'justify-content-start-alt': 'align-top',
    'justify-content-center-alt': 'align-center-vertical',
    'justify-content-end-alt': 'align-bottom',
    'justify-content-between-alt': 'arrows-out-line-vertical',
    'justify-content-around-alt': 'arrows-out-line-vertical',
    'make-same-width': 'arrows-out-line-horizontal',
    'make-same-height': 'arrows-out-line-vertical',

    // Table operations
    'table-properties': 'table',
    'table-column-insert-left': 'table',
    'table-column-insert-right': 'table',
    'table-row-insert-above': 'table',
    'table-row-insert-below': 'table',
    'cells-merge': 'table',
    'cells-merge-horizontally': 'table',
    'cells-merge-vertically': 'table',
    'cell-split-horizontally': 'table',
    'cell-split-vertically': 'table',
    'table-unmerge': 'table',

    // Text formatting
    'spell-checker': 'check-circle',
    'regular-expression': 'code',
    'whole-word': 'text-aa',
    'font-grow': 'text-a-underline',
    'font-shrink': 'text-a-underline',
    'text-wrap-arrow': 'arrow-u-down-left',
    'convert-lowercase': 'text-a-underline',
    'convert-uppercase': 'text-a-underline',
    'all': 'text-aa',
    'text-wrap': 'arrow-u-down-left',
    'table-align-top-left': 'align-top',
    'table-align-top-right': 'align-top',
    'font-size': 'text-aa',

    // CSS position
    'position-bottom': 'align-bottom',
    'position-left': 'align-left',
    'position-right': 'align-right',
    'position-top': 'align-top',

    // Files
    'table-position-start': 'align-left',
    'table-position-end': 'align-right',

    // Layout
    'ungroup': 'selection-all',
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
    console.log(colors.cyan('\n=== Kendo Icons: Phosphor-Only Full Mapping ===\n'));

    // Load existing Phosphor mapping (Phase 2)
    if (!fs.existsSync(EXISTING_MAPPING_PATH)) {
        console.log(colors.red('phosphor-mapping.json not found. Run: npm run generate:phosphor-mapping'));
        process.exit(1);
    }

    const existing = fs.readJsonSync(EXISTING_MAPPING_PATH);

    // Build Phosphor name sets from all three directories
    const regularNames = new Set(
        fs.readdirSync(PHOSPHOR_REGULAR_DIR).map(f => f.replace('.svg', ''))
    );
    const fillNames = new Set(
        fs.readdirSync(PHOSPHOR_FILL_DIR).map(f => f.replace('-fill.svg', ''))
    );
    const duotoneNames = new Set(
        fs.readdirSync(PHOSPHOR_DUOTONE_DIR).map(f => f.replace('-duotone.svg', ''))
    );

    console.log(`Existing mapping: ${existing.icons.length} icons (${existing.meta.stats.matched} matched, ${existing.meta.stats.unmatched} unmatched)`);
    console.log(`Phosphor regular: ${regularNames.size} icons`);
    console.log(`Phosphor fill:    ${fillNames.size} icons`);
    console.log(`Phosphor duotone: ${duotoneNames.size} icons`);
    console.log(`Extra mappings:   ${Object.keys(KENDO_TO_PHOSPHOR_EXTRA).length}\n`);

    const results = existing.icons.map(icon => {
        return resolveFullPhosphor(icon, regularNames, fillNames, duotoneNames);
    });

    const stats = computeStats(results);

    const output = {
        meta: {
            generated: new Date().toISOString(),
            description: 'Phosphor-only mapping: all three weights (regular/fill/duotone) from Phosphor',
            totalIcons: results.length,
            stats,
        },
        icons: results,
    };

    fs.writeJsonSync(OUTPUT_PATH, output, { spaces: 2 });
    console.log(colors.green(`\nMapping written to: scripts/phosphor/phosphor-full-mapping.json`));
    printReport(stats, results);
}

function resolveFullPhosphor(icon, regularNames, fillNames, duotoneNames) {
    const { kendoName, phosphorBase, status, resolution, categories } = icon;

    let base = phosphorBase;
    let res = resolution;
    let notes = icon.notes || undefined;

    // If previously unmatched, try extra mapping
    if (status === 'unmatched' || !base) {
        if (KENDO_TO_PHOSPHOR_EXTRA[kendoName]) {
            const candidate = KENDO_TO_PHOSPHOR_EXTRA[kendoName];
            if (regularNames.has(candidate) && fillNames.has(candidate) && duotoneNames.has(candidate)) {
                base = candidate;
                res = 'kendo-extra';
                notes = `Extra mapping: ${kendoName} → ${candidate}`;
            }
        }
    }

    // Validate all three files exist
    if (base) {
        const regularExists = regularNames.has(base);
        const fillExists = fillNames.has(base);
        const duotoneExists = duotoneNames.has(base);

        if (!regularExists || !fillExists || !duotoneExists) {
            console.log(colors.yellow(`  WARN: ${kendoName}: Phosphor "${base}" missing regular=${regularExists} fill=${fillExists} duotone=${duotoneExists}`));
            base = null;
            res = null;
            notes = `Phosphor base "${icon.phosphorBase}" missing some weight files`;
        }
    }

    return {
        kendoName,
        phosphorBase: base,
        regularFile: base ? `${base}.svg` : null,
        fillFile: base ? `${base}-fill.svg` : null,
        duotoneFile: base ? `${base}-duotone.svg` : null,
        status: base ? 'matched' : 'unmatched',
        resolution: base ? res : null,
        categories: categories || [],
        notes,
    };
}

function computeStats(results) {
    const matched = results.filter(r => r.status === 'matched');
    const unmatched = results.filter(r => r.status === 'unmatched');

    const byResolution = {};
    matched.forEach(r => {
        byResolution[r.resolution] = (byResolution[r.resolution] || 0) + 1;
    });

    return {
        matched: matched.length,
        unmatched: unmatched.length,
        byResolution,
    };
}

function printReport(stats, results) {
    console.log(colors.cyan('\n=== Phosphor Full Mapping Summary ==='));
    console.log(colors.green(`  Matched:   ${stats.matched} / ${results.length} (${(100 * stats.matched / results.length).toFixed(1)}%)`));
    console.log(colors.red(`  Unmatched: ${stats.unmatched}`));
    console.log();
    console.log(colors.cyan('  By resolution:'));
    Object.entries(stats.byResolution)
        .sort(([, a], [, b]) => b - a)
        .forEach(([res, count]) => {
            console.log(`    ${res}: ${count}`);
        });

    const unmatched = results.filter(r => r.status === 'unmatched');
    if (unmatched.length > 0) {
        console.log(colors.yellow(`\n  Still unmatched (${unmatched.length}):`));
        const byCategory = {};
        unmatched.forEach(r => {
            const cat = (r.categories && r.categories[0]) || 'uncategorized';
            byCategory[cat] = byCategory[cat] || [];
            byCategory[cat].push(r.kendoName);
        });
        Object.entries(byCategory)
            .sort(([, a], [, b]) => b.length - a.length)
            .forEach(([cat, names]) => {
                console.log(colors.yellow(`    ${cat} (${names.length}): ${names.join(', ')}`));
            });
    }

    console.log();
}

main();
