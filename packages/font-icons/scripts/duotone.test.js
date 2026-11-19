const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const { resolve } = require('node:path');
const { Resvg } = require('@resvg/resvg-js');
const { parse } = require('svg-parser');
const { optimize } = require('svgo');
const svg2ttf = require('svg2ttf');
const { svgFontTemplate } = require('./templates');
const { splitDuotone, secondaryUnicode, secondaryOpacity, withEmptySecondaryGlyphs } = require('./duotone');

const svg = content => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">${content}</svg>`;
const render = (content, size = 24) => new Resvg(content, { fitTo: { mode: 'width', value: size } }).render().pixels;

test('monochrome fonts map secondary characters to blank glyphs instead of font fallback', () => {
    const glyphs = withEmptySecondaryGlyphs([ { name: 'sample', unicode: 'e000', d: 'M4 4h16v16H4z' } ]);
    const ttf = Buffer.from(svg2ttf(svgFontTemplate({ fontName: 'SampleIcons', glyphs })).buffer);
    const tables = {};
    for (let i = 0; i < ttf.readUInt16BE(4); i++) {
        const offset = 12 + 16 * i;
        tables[ttf.toString('ascii', offset, offset + 4)] = ttf.readUInt32BE(offset + 8);
    }
    let cmap;
    for (let i = 0; i < ttf.readUInt16BE(tables.cmap + 2); i++) {
        const offset = tables.cmap + ttf.readUInt32BE(tables.cmap + 8 + 8 * i);
        if (ttf.readUInt16BE(offset) === 12) {
            cmap = offset;
        }
    }
    const mappedGlyphs = new Map();
    for (let i = 0; i < ttf.readUInt32BE(cmap + 12); i++) {
        const offset = cmap + 16 + 12 * i;
        for (let codepoint = ttf.readUInt32BE(offset); codepoint <= ttf.readUInt32BE(offset + 4); codepoint++) {
            mappedGlyphs.set(codepoint, ttf.readUInt32BE(offset + 8) + codepoint - ttf.readUInt32BE(offset));
        }
    }
    const shortLoca = ttf.readInt16BE(tables.head + 50) === 0;
    const location = index => (shortLoca
        ? ttf.readUInt16BE(tables.loca + index * 2) * 2
        : ttf.readUInt32BE(tables.loca + index * 4));
    const primary = mappedGlyphs.get(0xe000);
    const secondary = mappedGlyphs.get(0xf0000);
    assert.ok(primary > 0);
    assert.ok(secondary > 0);
    assert.notEqual(location(primary), location(primary + 1));
    assert.equal(location(secondary), location(secondary + 1));
});

test('separates secondary fill and primary stroke on the same shape', () => {
    const layers = splitDuotone(svg('<rect x="4" y="4" width="16" height="16" fill="black" fill-opacity="0.2" stroke="black" stroke-width="2"/>'), 'mixed');
    const primary = parse(layers.primary).children[0].children[0].properties;
    const secondary = parse(layers.secondary).children[0].children[0].properties;
    assert.equal(primary.fill, 'none');
    assert.equal(primary.stroke, 'black');
    assert.equal(secondary.fill, 'black');
    assert.equal(secondary.stroke, 'none');
    assert.equal(secondary['fill-opacity'], undefined);
});

test('retains inherited paints, transforms, clipping and definitions', () => {
    const content = svg('<defs><clipPath id="clip"><rect width="12" height="24"/></clipPath></defs><g fill="black" fill-opacity="0.2" transform="translate(2 0)" clip-path="url(#clip)"><rect width="20" height="20"/></g>');
    const layers = splitDuotone(content, 'clipped');
    assert.deepEqual(render(layers.secondary), render(content.replace('fill-opacity="0.2"', 'fill-opacity="1"')));
    assert.ok(render(layers.primary).every(value => value === 0));
});

test('retains group opacity geometry and allows genuinely empty secondary layers', () => {
    const content = svg('<g opacity="0.2"><rect width="20" height="20" fill="black"/></g>');
    assert.deepEqual(render(splitDuotone(content, 'group').secondary), render(content.replace('opacity="0.2"', 'opacity="1"')));
    const primaryOnly = splitDuotone(svg('<circle cx="12" cy="12" r="8"/>'), 'primary-only');
    assert.ok(render(primaryOnly.secondary).every(value => value === 0));
    assert.ok(render(primaryOnly.primary).some(value => value !== 0));
});

test('reports unsupported paints and compositing with the icon name', () => {
    for (const shape of [
        '<rect width="24" height="24" opacity="0.4"/>',
        '<rect width="24" height="24" fill="url(#gradient)"/>',
        '<g style="opacity:.2"><path d="M0 0h24v24z"/></g>',
        '<use href="#shape"/>',
        '<rect width="24" height="24" mask="url(#mask)"/>'
    ]) {
        assert.throws(() => splitDuotone(svg(shape), 'unsupported-icon'), /Duotone icon "unsupported-icon": Unsupported/);
    }
});

test('maps secondary codepoints deterministically into supplementary private use', () => {
    const icons = JSON.parse(fs.readFileSync(resolve(__dirname, '../../..', 'src/telerik-icons/icons.json')));
    const primary = new Set(icons.map(icon => Number.parseInt(icon.unicode, 16)));
    const secondary = icons.map(icon => Number.parseInt(secondaryUnicode(icon.unicode), 16));
    assert.equal(new Set(secondary).size, icons.length);
    secondary.forEach(codepoint => {
        assert.ok(codepoint >= 0xf0000 && codepoint <= 0xffffd);
        assert.ok(!primary.has(codepoint));
    });

    assert.equal(secondaryUnicode('e000'), 'f0000');
    assert.equal(secondaryUnicode('ea21'), 'f0a21');
    assert.throws(() => secondaryUnicode('not-hex'), /private-use/);
    assert.throws(() => secondaryUnicode('20'), /private-use/);
});

test('preserves uniformly overlapping secondary paints and rejects mixed opacity areas', () => {
    const shape = '<rect x="4" y="4" width="12" height="12" fill="black" fill-opacity="0.2"/>';
    for (const [ content, expected ] of [ [ shape, 0.2 ], [ shape + shape, 0.36 ] ]) {
        const source = svg(content);
        const layers = splitDuotone(source, 'overlap');
        assert.equal(secondaryOpacity(render(source), render(layers.primary), render(layers.secondary), 'overlap'), expected);
    }
    const mixed = svg(shape + '<rect x="8" y="4" width="12" height="12" fill="black" fill-opacity="0.2"/>');
    const layers = splitDuotone(mixed, 'mixed-overlap');
    assert.throws(() => secondaryOpacity(render(mixed), render(layers.primary), render(layers.secondary), 'mixed-overlap'), /mixed-overlap.*different opacity levels/);
});

test('rejects non-monochrome paint outside retained clipping definitions', () => {
    const source = svg('<rect x="4" y="4" width="12" height="12"/><rect x="4" y="4" width="12" height="12" fill="white" fill-opacity="0.2"/>');
    assert.throws(() => splitDuotone(source, 'paint-order'), /paint-order.*Unsupported paint "white"/);
});

test('preserves catalog overlap opacity despite optimized subpixel edge outliers', () => {
    for (const [ name, expected ] of [ [ 'perimeter', 0.36 ], [ 'paste-sparkle', 0.2 ] ]) {
        const path = resolve(__dirname, '../../../src/telerik-icons/duotone', `${name}.svg`);
        const source = optimize(fs.readFileSync(path, 'utf8')).data;
        const layers = splitDuotone(source, name);
        assert.equal(secondaryOpacity(render(source, 192), render(layers.primary, 192), render(layers.secondary, 192), name), expected);
    }
});
