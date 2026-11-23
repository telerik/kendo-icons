const { parse } = require('svg-parser');

const SHAPES = new Set([ 'path', 'rect', 'circle', 'ellipse', 'polygon', 'polyline', 'line' ]);
const PAINT = [ 'fill', 'stroke', 'fill-opacity', 'stroke-opacity' ];

function secondaryUnicode(unicode) {
    const primary = Number.parseInt(unicode, 16);
    if (!/^[\da-f]+$/i.test(unicode) || primary < 0xe000 || primary > 0xf8ff) {
        throw new Error(`Expected a BMP private-use icon codepoint, received "${unicode}"`);
    }
    return (0xf0000 + primary - 0xe000).toString(16);
}

function serialize(node) {
    const attributes = Object.entries(node.properties || {})
        .map(([ key, value ]) => ` ${key}="${String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')}"`)
        .join('');
    return `<${node.tagName}${attributes}>${(node.children || []).map(serialize).join('')}</${node.tagName}>`;
}

function paintLayer(color, opacity) {
    if (color === 'none' || opacity === 0) {
        return null;
    }
    if (![ 'black', '#000', '#000000' ].includes(color)) {
        throw new Error(`Unsupported paint "${color}"`);
    }
    if (opacity === 1) {
        return 'primary';
    }
    if (Math.abs(opacity - 0.2) < 0.000001) {
        return 'secondary';
    }
    throw new Error(`Unsupported paint opacity ${opacity}; expected 1 or 0.2`);
}

function splitNode(node, inherited, layer) {
    if (node.type !== 'element') {
        throw new Error('Unsupported non-element SVG content');
    }
    if (node.tagName === 'defs') {
        return node;
    }
    if (![ 'svg', 'g', ...SHAPES ].includes(node.tagName)) {
        throw new Error(`Unsupported SVG element <${node.tagName}>`);
    }
    const props = { ...node.properties };
    for (const key of [ 'style', 'class', 'mask', 'filter', 'paint-order' ]) {
        if (key in props) {
            throw new Error(`Unsupported SVG attribute "${key}"`);
        }
    }
    const paint = { ...inherited };
    PAINT.forEach(key => {
        if (key in props) {
            paint[key] = props[key];
        }
    });
    paint.opacity *= Number(props.opacity === undefined ? 1 : props.opacity);
    delete props.opacity;
    delete props['fill-opacity'];
    delete props['stroke-opacity'];

    if (SHAPES.has(node.tagName)) {
        for (const channel of [ 'fill', 'stroke' ]) {
            const opacity = paint.opacity * Number(paint[`${channel}-opacity`]);
            props[channel] = paintLayer(paint[channel], opacity) === layer ? paint[channel] : 'none';
        }
    }
    return {
        ...node,
        properties: props,
        children: (node.children || []).map(child => splitNode(child, paint, layer))
    };
}

function splitDuotone(svg, name) {
    try {
        const root = parse(svg).children[0];
        const inherited = { fill: 'black', stroke: 'none', 'fill-opacity': 1, 'stroke-opacity': 1, opacity: 1 };
        return {
            primary: serialize(splitNode(root, inherited, 'primary')),
            secondary: serialize(splitNode(root, inherited, 'secondary'))
        };
    } catch (error) {
        throw new Error(`Duotone icon "${name}": ${error.message}`, { cause: error });
    }
}

function secondaryOpacity(source, primary, secondary, name) {
    const levels = new Map();
    const maxEdgePixels = source.length / 4 * 0.005;
    for (let i = 3; i < source.length; i += 4) {
        if (primary[i] === 0 && secondary[i] === 255) {
            const level = Math.round(source[i] / 255 * 100) / 100;
            levels.set(level, (levels.get(level) || 0) + 1);
        }
    }
    const ranked = [ ...levels ].sort((a, b) => b[1] - a[1]);
    const outliers = ranked.slice(1).reduce((sum, entry) => sum + entry[1], 0);
    if (outliers > maxEdgePixels) {
        throw new Error(`Duotone icon "${name}": secondary paints overlap at different opacity levels`);
    }
    // Thin or empty secondary geometry may have no fully covered interior pixels.
    const opacity = ranked.length ? ranked[0][0] : 0.2;
    let mismatches = 0;
    for (let i = 3; i < source.length; i += 4) {
        const composite = primary[i] + secondary[i] * opacity * (1 - primary[i] / 255);
        if (Math.abs(source[i] - composite) > 4) {
            mismatches++;
        }
    }
    // Allow subpixel edge differences, not materially different compositing.
    if (mismatches > maxEdgePixels) {
        throw new Error(`Duotone icon "${name}": cannot reproduce source compositing with two glyph layers`);
    }
    return opacity;
}

function withEmptySecondaryGlyphs(glyphs) {
    return glyphs.concat(glyphs.map(glyph => ({
        name: `${glyph.name}-secondary`,
        unicode: secondaryUnicode(glyph.unicode),
        ligatures: [],
        d: ''
    })));
}

module.exports = { splitDuotone, secondaryUnicode, secondaryOpacity, withEmptySecondaryGlyphs };
