/**
 * kendoify.js — Apply Kendo Design Language to fill-based Phosphor SVGs.
 *
 * IMPORTANT: Phosphor icons are FILL-BASED (paths define filled shapes).
 * They are NOT stroke-based like Lucide. This means:
 *   - stroke-linejoin/linecap only affect actual strokes, not fill edges
 *   - Adding thick strokes on top of fills bloats the visual weight
 *   - Path geometry must be modified directly for shape changes
 *
 * Kendo Signature for fill-based icons:
 *
 *   1. OPTICAL GRID: Content scaled to 21.6×21.6 area centered in 24×24
 *      viewBox (1.2px padding, 10% safe zone). Gives consistent breathing
 *      room and uniform visual weight across the entire icon set.
 *
 *   2. OUTLINE VARIANT — Subtle Edge Definition:
 *      A very thin stroke overlay (0.25px) with MITER joins (the Kendo
 *      visual signature). On fill shapes this creates subtle sharp corners
 *      at path intersections — an "engineered" quality that distinguishes
 *      from stock Phosphor without bloating the fills.
 *
 *   3. SOLID VARIANT — Pure Fills:
 *      Clean fill only. NO stroke attributes. Single merged path preferred.
 *      The silhouette speaks for itself.
 *
 *   4. DUOTONE VARIANT — Layered Fills:
 *      Background layer at 0.2 opacity (Kendo standard). Foreground at
 *      full opacity. No stroke noise.
 *
 *   5. CORNER RADIUS: Rects get normalized 1.25px corner radius for the
 *      Kendo "softened geometric" feel.
 *
 *   6. COLOR: All fills → currentColor for theme integration.
 *
 * Pipeline: Phosphor 256×256 → parse → filter chrome → scale → style → SVGO
 */

const svgParser = require('svg-parser');
const svgpath = require('svgpath');
const { optimize } = require('svgo');
const { getSvgoConfig } = require('./svgo-fill.config');

// ---------------------------------------------------------------------------
// Kendo Design Tokens
// ---------------------------------------------------------------------------
const KENDO = {
    viewBox: 24,
    contentSize: 21.6,     // 90% of viewBox — 10% safe zone
    padding: 1.2,          // (24 - 21.6) / 2
    sourceSize: 256,       // Phosphor source viewBox

    get scaleFactor() { return this.contentSize / this.sourceSize; },
    get offset() { return this.padding; },

    // Corner radius for geometric shapes (rects)
    cornerRadius: 1.25,

    // Outline: subtle miter-joined stroke overlay on fills
    outline: {
        stroke: 'currentColor',
        strokeWidth: 0.25,         // Thin — for edge definition, not visual weight
        strokeLinejoin: 'miter',   // THE Kendo differentiator: sharp engineered corners
        strokeMiterlimit: 2,       // Clip extreme angles gracefully
        strokeLinecap: 'round',
    },

    // Solid: pure fill, zero stroke
    solid: {},

    // Duotone: layered fills
    duotone: {
        backgroundOpacity: 0.2,
    },
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

function kendoifyOutline(svgString)  { return kendoify(svgString, 'outline'); }
function kendoifySolid(svgString)    { return kendoify(svgString, 'solid'); }
function kendoifyDuotone(svgString)  { return kendoify(svgString, 'duotone'); }

/**
 * Main kendoify — transforms a raw Phosphor SVG into a Kendo-styled SVG.
 *
 * @param {string} svgString - Raw Phosphor SVG content (256×256)
 * @param {'outline'|'solid'|'duotone'} variant - Target Kendo variant
 * @returns {string} Kendoified, optimized SVG string
 */
function kendoify(svgString, variant = 'outline') {
    // 1. Parse
    const parsed = svgParser.parse(svgString);
    const svgRoot = parsed.children[0];
    if (!svgRoot || svgRoot.tagName !== 'svg') {
        throw new Error('Invalid SVG: no root <svg> element');
    }

    // 2. Collect shape elements, filtering out Phosphor background chrome
    const allShapes = collectShapeElements(svgRoot);
    const contentShapes = allShapes.filter(el => !isBackgroundRect(el));

    if (contentShapes.length === 0) {
        throw new Error('No content shapes found after filtering');
    }

    // 3. Transform: scale to Kendo optical grid + apply variant styling
    const transformed = contentShapes
        .map(el => transformElement(el, variant))
        .filter(Boolean);

    // 4. Build SVG with Kendo design tokens
    const kendoSvg = buildKendoSvg(transformed, variant);

    // 5. SVGO optimization
    const result = optimize(kendoSvg, getSvgoConfig(variant));
    return result.data;
}

// ---------------------------------------------------------------------------
// SVG tree walker
// ---------------------------------------------------------------------------

const SHAPE_TAGS = new Set(['path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse']);

/** Recursively collect all shape elements from parsed SVG tree. */
function collectShapeElements(node, shapes = []) {
    if (!node) return shapes;
    if (node.tagName && SHAPE_TAGS.has(node.tagName)) {
        shapes.push(node);
    }
    if (node.children) {
        for (const child of node.children) {
            collectShapeElements(child, shapes);
        }
    }
    return shapes;
}

/** Detect the Phosphor 256×256 background bounding-box rect. */
function isBackgroundRect(el) {
    if (el.tagName !== 'rect') return false;
    const p = el.properties || {};
    const w = parseFloat(p.width) || 0;
    const h = parseFloat(p.height) || 0;
    if (w >= 255 && h >= 255) return true;
    if ((p.fill || '').toLowerCase() === 'none' && w >= 200 && h >= 200) return true;
    return false;
}

// ---------------------------------------------------------------------------
// Geometry scaling — 256 → 21.6×21.6 content area centered in 24×24
// ---------------------------------------------------------------------------

function kendoifyPathData(d) {
    return svgpath(d)
        .scale(KENDO.scaleFactor)
        .translate(KENDO.offset, KENDO.offset)
        .round(3)
        .rel()
        .toString();
}

function scaleAttr(value, withOffset) {
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    const scaled = num * KENDO.scaleFactor + (withOffset ? KENDO.offset : 0);
    return roundTo(scaled, 3);
}

function scaleStrokeWidth(value) {
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    return roundTo(num * KENDO.scaleFactor, 3);
}

function scalePoints(pointsStr) {
    if (!pointsStr) return '';
    return pointsStr.trim().split(/\s+/).map(pair => {
        const [x, y] = pair.split(',').map(Number);
        const sx = roundTo(x * KENDO.scaleFactor + KENDO.offset, 3);
        const sy = roundTo(y * KENDO.scaleFactor + KENDO.offset, 3);
        return `${sx},${sy}`;
    }).join(' ');
}

function roundTo(num, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round(num * factor) / factor;
}



// ---------------------------------------------------------------------------
// Per-shape transformers
// ---------------------------------------------------------------------------

function txPath(el) {
    const p = { ...el.properties };
    if (p.d) {
        p.d = kendoifyPathData(p.d);
    }
    // Strip any source stroke-width — we control this at the SVG root level
    delete p['stroke-width'];
    delete p['stroke-linejoin'];
    delete p['stroke-linecap'];
    return { tagName: 'path', properties: p };
}

function txCircle(el) {
    const p = { ...el.properties };
    p.cx = scaleAttr(p.cx, true);
    p.cy = scaleAttr(p.cy, true);
    p.r  = scaleAttr(p.r, false);
    delete p['stroke-width'];
    return { tagName: 'circle', properties: p };
}

function txEllipse(el) {
    const p = { ...el.properties };
    p.cx = scaleAttr(p.cx, true);
    p.cy = scaleAttr(p.cy, true);
    p.rx = scaleAttr(p.rx, false);
    p.ry = scaleAttr(p.ry, false);
    delete p['stroke-width'];
    return { tagName: 'ellipse', properties: p };
}

function txRect(el) {
    const p = { ...el.properties };
    p.x      = scaleAttr(p.x || 0, true);
    p.y      = scaleAttr(p.y || 0, true);
    p.width  = scaleAttr(p.width, false);
    p.height = scaleAttr(p.height, false);

    // Corner radius: normalize to Kendo spec (1.25px)
    const srcRx = parseFloat(p.rx) || 0;
    const srcRy = parseFloat(p.ry) || 0;
    const scaledRx = srcRx * KENDO.scaleFactor;
    const scaledRy = srcRy * KENDO.scaleFactor;
    // Rects with existing rounding: cap at Kendo radius. Sharp rects: add subtle rounding.
    p.rx = roundTo(scaledRx > 0 ? Math.min(scaledRx, KENDO.cornerRadius) : KENDO.cornerRadius * 0.6, 3);
    p.ry = roundTo(scaledRy > 0 ? Math.min(scaledRy, KENDO.cornerRadius) : KENDO.cornerRadius * 0.6, 3);

    delete p['stroke-width'];
    return { tagName: 'rect', properties: p };
}

function txLine(el) {
    const p = { ...el.properties };
    p.x1 = scaleAttr(p.x1, true);
    p.y1 = scaleAttr(p.y1, true);
    p.x2 = scaleAttr(p.x2, true);
    p.y2 = scaleAttr(p.y2, true);
    delete p['stroke-width'];
    return { tagName: 'line', properties: p };
}

function txPoly(el) {
    const p = { ...el.properties };
    p.points = scalePoints(p.points);
    delete p['stroke-width'];
    return { tagName: el.tagName, properties: p };
}

const TX = {
    path: txPath, circle: txCircle, ellipse: txEllipse,
    rect: txRect, line: txLine, polyline: txPoly, polygon: txPoly,
};

// ---------------------------------------------------------------------------
// Element transform + Kendo styling
// ---------------------------------------------------------------------------

function transformElement(el, variant) {
    const tx = TX[el.tagName];
    if (!tx) return null;

    const out = tx(el);
    const p = out.properties;

    // ── Color normalization ──
    if (p.fill !== 'none') p.fill = 'currentColor';
    if (p.stroke && p.stroke !== 'none') p.stroke = 'currentColor';

    // ── Solid/Duotone: strip any stroke attributes from shapes ──
    // These are fill-based icons — strokes at the element level are noise
    if (variant === 'solid' || variant === 'duotone') {
        delete p.stroke;
        delete p['stroke-width'];
        delete p['stroke-linejoin'];
        delete p['stroke-linecap'];
        delete p['stroke-miterlimit'];
    }

    // ── Duotone: normalize background layer opacity ──
    if (variant === 'duotone' && p.opacity) {
        p.opacity = String(KENDO.duotone.backgroundOpacity);
    }

    return out;
}

// ---------------------------------------------------------------------------
// SVG assembly
// ---------------------------------------------------------------------------

function serializeElement(el) {
    const attrs = Object.entries(el.properties || {})
        .filter(([, v]) => v !== undefined && v !== null)
        .map(([k, v]) => `${k}="${escapeAttr(String(v))}"`)
        .join(' ');
    return `<${el.tagName} ${attrs}/>`;
}

function escapeAttr(str) {
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function buildKendoSvg(elements, variant) {
    const svgAttrs = [
        'xmlns="http://www.w3.org/2000/svg"',
        `viewBox="0 0 ${KENDO.viewBox} ${KENDO.viewBox}"`,
        'fill="currentColor"',
    ];

    if (variant === 'outline') {
        // No stroke overlay — Phosphor Light fills are already thin enough.
        // Adding any stroke thickens edges beyond the original.
    }
    // Solid and Duotone: NO stroke attributes at all — pure fill icons

    const inner = elements.map(serializeElement).join('\n  ');
    return `<svg ${svgAttrs.join(' ')}>\n  ${inner}\n</svg>`;
}

module.exports = { kendoify, kendoifyOutline, kendoifySolid, kendoifyDuotone, KENDO };
