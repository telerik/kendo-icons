/**
 * preview-phosphor.js
 *
 * Generates a single HTML preview showing all four columns side by side:
 *   Original (Kendo) → Phosphor Outline → Phosphor Solid → Phosphor Duotone
 *
 * Groups by resolution type (how the Phosphor match was found) and
 * also shows unmatched icons that have no Phosphor equivalent.
 */

const fs = require('fs-extra');
const path = require('path');
const colors = require('ansi-colors');

const ROOT = path.resolve(__dirname, '../..');

// Transformed output dirs
const OUTLINE_DIR = path.resolve(ROOT, 'src/telerik-icons/outline/transformed');
const SOLID_DIR = path.resolve(ROOT, 'src/telerik-icons/solid/transformed');
const DUOTONE_DIR = path.resolve(ROOT, 'src/telerik-icons/duotone/transformed');

// Original Kendo icons (from TS source)
const ORIGINAL_ICONS_DIR = path.resolve(ROOT, 'packages/svg-icons/src/icons');

// Original (untransformed) Phosphor icons for comparison
const PHOSPHOR_ORIG_OUTLINE_DIR = path.resolve(ROOT, 'src/telerik-icons/outline/originals');
const PHOSPHOR_ORIG_SOLID_DIR = path.resolve(ROOT, 'src/telerik-icons/solid/originals');
const PHOSPHOR_ORIG_DUOTONE_DIR = path.resolve(ROOT, 'src/telerik-icons/duotone/originals');



// Mapping for metadata
const MAPPING_PATH = path.resolve(__dirname, 'phosphor-full-mapping.json');
const OUTPUT_PATH = path.resolve(__dirname, 'preview-phosphor.html');

function ensureNS(svg) {
    if (!svg) return null;
    return svg.includes('xmlns=') ? svg : svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
}

/**
 * Load the original Kendo icon from its TypeScript source file.
 */
function loadOriginalIcon(name) {
    const tsPath = path.resolve(ORIGINAL_ICONS_DIR, `${name}.ts`);
    if (!fs.existsSync(tsPath)) return null;
    const src = fs.readFileSync(tsPath, 'utf-8');
    const contentMatch = src.match(/content:\s*'([^']+)'/);
    const viewBoxMatch = src.match(/viewBox:\s*'([^']+)'/);
    if (!contentMatch) return null;
    const content = contentMatch[1];
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 512 512';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${content}</svg>`;
}

function readSvg(dir, name) {
    const p = path.resolve(dir, `${name}.svg`);
    if (!fs.existsSync(p)) return null;
    return fs.readFileSync(p, 'utf-8');
}

function main() {
    console.log(colors.cyan('\n=== Generate Phosphor Preview ===\n'));

    if (!fs.existsSync(MAPPING_PATH)) {
        console.log(colors.red('phosphor-full-mapping.json not found. Run: npm run phosphor:mapping'));
        process.exit(1);
    }

    const mapping = fs.readJsonSync(MAPPING_PATH);
    const iconMap = new Map(mapping.icons.map(i => [i.kendoName, i]));

    // Master list: all 828 icons from mapping
    const icons = [];

    for (const iconEntry of mapping.icons) {
        const name = iconEntry.kendoName;

        icons.push({
            name,
            status: iconEntry.status,
            resolution: iconEntry.resolution || 'unmatched',
            phosphorBase: iconEntry.phosphorBase,
            categories: iconEntry.categories || [],
            original: loadOriginalIcon(name),
            // Phosphor-based variants
            outline: ensureNS(readSvg(OUTLINE_DIR, name)),
            solid: ensureNS(readSvg(SOLID_DIR, name)),
            duotone: ensureNS(readSvg(DUOTONE_DIR, name)),
            // Original (untransformed) Phosphor for comparison
            origPhosphorOutline: ensureNS(readSvg(PHOSPHOR_ORIG_OUTLINE_DIR, name)),
            origPhosphorSolid: ensureNS(readSvg(PHOSPHOR_ORIG_SOLID_DIR, name)),
            origPhosphorDuotone: ensureNS(readSvg(PHOSPHOR_ORIG_DUOTONE_DIR, name)),

        });
    }

    console.log(`Icons: ${icons.length}`);

    // Group by resolution type
    const groups = {};
    icons.forEach(icon => {
        const g = icon.resolution || 'unmatched';
        groups[g] = groups[g] || [];
        groups[g].push(icon);
    });

    const groupOrder = [
        'phosphor-direct',
        'lucide-identical',
        'lucide-crossref',
        'kendo-extra',
        'unmatched'
    ];
    const sortedGroups = groupOrder.filter(g => groups[g] && groups[g].length > 0);

    const categorySet = new Set();
    icons.forEach(i => (i.categories || []).forEach(c => categorySet.add(c)));
    const allCategories = [...categorySet].sort();

    const resolutionOptions = sortedGroups
        .map(g => `<option value="${g}">${g} (${groups[g].length})</option>`)
        .join('\n            ');

    const categoryOptions = allCategories
        .map(c => {
            const count = icons.filter(i => i.categories.includes(c)).length;
            return `<option value="cat:${c}">${c} (${count})</option>`;
        })
        .join('\n            ');

    const na = '<span class="na">N/A</span>';
    const missing = '<span class="na">Missing</span>';

    const sections = sortedGroups.map(type => {
        const arr = groups[type].sort((a, b) => a.name.localeCompare(b.name));
        const cards = arr.map(icon => {
            const cats = (icon.categories || []).join(', ');
            const badgeClass = icon.resolution || 'unmatched';
            const phosphorLabel = icon.phosphorBase ? `phosphor:${icon.phosphorBase}` : '';

            return `
            <div class="card" data-name="${icon.name}" data-resolution="${icon.resolution}" data-categories="${(icon.categories || []).join(',')}">
                <div class="card-header">
                    <span class="name">${icon.name}</span>
                    <span class="badge ${badgeClass}">${icon.resolution}</span>
                    ${phosphorLabel ? `<span class="meta">${phosphorLabel}</span>` : ''}
                </div>
                <div class="comparison">
                    <div>
                        <div class="label">Original</div>
                        <div class="icon-container original">${icon.original || na}</div>
                    </div>
                    <div>
                        <div class="label">New Kendo Outline</div>
                        <div class="icon-container phosphor">${icon.outline || missing}</div>
                    </div>
                    <div>
                        <div class="label">New Kendo Solid</div>
                        <div class="icon-container phosphor">${icon.solid || missing}</div>
                    </div>
                    <div>
                        <div class="label">New Kendo Duotone</div>
                        <div class="icon-container phosphor">${icon.duotone || missing}</div>
                    </div>
                </div>

                <div class="comparison orig-phosphor-row">
                    <div></div>
                    <div>
                        <div class="label">Orig Phosphor Outline</div>
                        <div class="icon-container orig-phosphor">${icon.origPhosphorOutline || missing}</div>
                    </div>
                    <div>
                        <div class="label">Orig Phosphor Solid</div>
                        <div class="icon-container orig-phosphor">${icon.origPhosphorSolid || missing}</div>
                    </div>
                    <div>
                        <div class="label">Orig Phosphor Duotone</div>
                        <div class="icon-container orig-phosphor">${icon.origPhosphorDuotone || missing}</div>
                    </div>
                </div>
            </div>`;
        }).join('\n');

        return `
        <div class="category-section" data-category="${type}">
            <h2 class="category-header">${type} <span class="count">(${arr.length})</span></h2>
            <div class="grid">${cards}</div>
        </div>`;
    }).join('\n');

    const stats = mapping.meta.stats;

    const html = `<!doctype html>
<html lang="en">
<head>
    <title>Kendo Icons — Phosphor vs Lucide Comparison</title>
    <meta charset="utf-8" />
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 24px; background: #f5f5f5; color: #1a1a1a;
        }
        h1 { margin-bottom: 4px; font-size: 22px; }
        .subtitle { color: #666; margin-bottom: 16px; font-size: 13px; }
        .stats-bar {
            margin-bottom: 16px; font-size: 13px; color: #555;
            display: flex; gap: 16px; flex-wrap: wrap;
        }
        .stats-bar span { font-weight: 600; }
        .controls {
            margin-bottom: 24px; display: flex; gap: 16px;
            align-items: center; flex-wrap: wrap;
            position: sticky; top: 0; background: #f5f5f5;
            padding: 8px 0; z-index: 10; border-bottom: 1px solid #ddd;
        }
        .controls label { font-size: 13px; cursor: pointer; }
        .controls select, .controls input { padding: 4px 8px; font-size: 13px; }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(640px, 1fr));
            gap: 10px;
        }
        .card {
            background: white; border-radius: 8px; padding: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        .card-header {
            font-size: 12px; margin-bottom: 8px;
            display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
        }
        .card-header .name { font-weight: 600; }
        .card-header .meta { color: #888; font-size: 10px; }
        .badge {
            font-size: 9px; padding: 1px 5px; border-radius: 3px;
        }
        .badge.phosphor-direct { background: #d4edda; color: #155724; }
        .badge.lucide-identical { background: #d1ecf1; color: #0c5460; }
        .badge.lucide-crossref { background: #e2d6f3; color: #4a2082; }
        .badge.kendo-extra { background: #fff3cd; color: #856404; }
        .badge.unmatched { background: #f8d7da; color: #721c24; }
        .comparison {
            display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 8px; text-align: center;
        }

        .na { color: #ccc; font-size: 11px; }
        .icon-container {
            display: flex; align-items: center; justify-content: center;
            padding: 8px; border: 1px dashed #e0e0e0; border-radius: 4px;
            min-height: 60px; background: var(--bg, white);
        }
        .icon-container.original { border-color: #c8d6e5; }

        .icon-container.phosphor { border-color: #b8f0c8; background: var(--bg, #f8fff8); }
        .icon-container.orig-phosphor { border-color: #f0d8b8; background: var(--bg, #fffaf4); }
        .comparison.orig-phosphor-row {
            margin-top: 6px; padding-top: 6px; border-top: 1px dashed #eee;
        }
        .icon-container svg {
            width: var(--icon-size, 48px);
            height: var(--icon-size, 48px);
        }
        .label {
            font-size: 9px; color: #888; margin-bottom: 4px;
            text-transform: uppercase; letter-spacing: 0.5px;
        }
        .category-header {
            font-size: 16px; margin: 24px 0 12px;
            padding-bottom: 6px; border-bottom: 1px solid #ddd;
        }
        .category-header .count { color: #888; font-weight: normal; font-size: 13px; }
        .hidden { display: none; }
        .toggle-row-2 { display: flex; align-items: center; gap: 4px; }
        .toggle-row-3 { display: flex; align-items: center; gap: 4px; }
    </style>
</head>
<body>
    <h1>Kendo Icons — Phosphor vs Lucide Comparison</h1>
    <p class="subtitle">
        Top row: Original → Phosphor Outline → Phosphor Solid → Phosphor Duotone.<br>
        Row 2: Lucide Outline / Lucide Solid / Lucide Duotone.<br>
        Row 3: Original Phosphor (untransformed) Outline / Solid / Duotone.<br>
        Generated ${new Date().toISOString().split('T')[0]}.
    </p>

    <div class="stats-bar">
        <div>Total: <span>${icons.length}</span></div>
        <div>Matched: <span>${stats.matched}</span></div>
        <div>Unmatched: <span>${stats.unmatched}</span></div>
        ${Object.entries(stats.byResolution || {}).map(([k, v]) => `<div>${k}: <span>${v}</span></div>`).join('\n        ')}
    </div>

    <div class="controls">
        <label>Resolution:
            <select id="resSelect">
                <option value="all">All (${icons.length})</option>
                ${resolutionOptions}
            </select>
        </label>
        <label>Category:
            <select id="catSelect">
                <option value="all">All</option>
                ${categoryOptions}
            </select>
        </label>
        <label>Size:
            <select id="sizeSelect">
                <option value="24">24px</option>
                <option value="32">32px</option>
                <option value="48" selected>48px</option>
                <option value="64">64px</option>
                <option value="96">96px</option>
            </select>
        </label>
        <label>Background:
            <select id="bgSelect">
                <option value="white">White</option>
                <option value="#f5f5f5">Light gray</option>
                <option value="#1a1a1a">Dark</option>
            </select>
        </label>
        <label>Search: <input type="text" id="search" placeholder="Filter by name..." /></label>

        <label class="toggle-row-3">
            <input type="checkbox" id="showRow3" />
            Show Original Phosphor
        </label>
    </div>

    ${sections}

    <script>
        document.getElementById('sizeSelect').addEventListener('change', e => {
            document.documentElement.style.setProperty('--icon-size', e.target.value + 'px');
        });
        document.getElementById('bgSelect').addEventListener('change', e => {
            document.documentElement.style.setProperty('--bg', e.target.value);
            const isDark = e.target.value === '#1a1a1a';
            document.querySelectorAll('.icon-container svg').forEach(svg => {
                svg.style.color = isDark ? 'white' : 'black';
            });
        });
        document.getElementById('resSelect').addEventListener('change', e => {
            const val = e.target.value;
            document.querySelectorAll('.category-section').forEach(s => {
                s.classList.toggle('hidden', val !== 'all' && s.dataset.category !== val);
            });
        });
        document.getElementById('catSelect').addEventListener('change', e => {
            const val = e.target.value;
            if (val === 'all') {
                document.querySelectorAll('.card').forEach(c => c.classList.remove('hidden'));
                return;
            }
            const cat = val.replace('cat:', '');
            document.querySelectorAll('.card').forEach(c => {
                const cats = (c.dataset.categories || '').split(',');
                c.classList.toggle('hidden', !cats.includes(cat));
            });
        });
        document.getElementById('search').addEventListener('input', e => {
            const q = e.target.value.toLowerCase();
            document.querySelectorAll('.card').forEach(c => {
                c.classList.toggle('hidden', q && !c.dataset.name.includes(q));
            });
        });

        // Original Phosphor row hidden by default
        document.querySelectorAll('.orig-phosphor-row').forEach(r => r.style.display = 'none');
        document.getElementById('showRow3').addEventListener('change', e => {
            const show = e.target.checked;
            document.querySelectorAll('.orig-phosphor-row').forEach(r => {
                r.style.display = show ? '' : 'none';
            });
        });
    </script>
</body>
</html>`;

    fs.writeFileSync(OUTPUT_PATH, html);
    console.log(colors.green(`\nWrote: ${OUTPUT_PATH}`));
    console.log(`${icons.length} icons, 7 columns (original + 3 New Kendo + 3 Orig Phosphor)\n`);
}

main();
