const fs = require('fs');
const svgpath = require('svgpath');

function svgFontTemplate(options) {
    const fontName = options.fontName;
    const glyphs = options.glyphs;
    return `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" >
<svg xmlns="http://www.w3.org/2000/svg">
    <defs>
        <font id="${fontName}" horiz-adv-x="1024" horiz-adv-y="1024">
            <font-face units-per-em="1024" ascent="960" descent="-64" />
            <missing-glyph />
            <glyph unicode="&#x20;" d="" />
${glyphs.map(glyph => `
            <glyph unicode="&#x${glyph.unicode};" d="${glyph.d ? svgpath(glyph.d).translate(0, -480).scale(2, -2).toString(): ''}" />`).join('')}
        </font>
    </defs>
</svg>`;
}

function indexTsTemplate(options) {

    return `export { SVGIcon } from './svg-icon.interface';

${options.map(icon => `
export { ${icon.iconTsName} } from './icons/${icon.iconName}';`).join('')}
`;
}

function svgTsTemplate(options) {
    const { iconName, iconTsName, iconSvgContent } = options;

    return `import { SVGIcon } from '../svg-icon.interface';

export const ${iconTsName}: SVGIcon = {
    name: '${iconName}',
    content: '<path d="${iconSvgContent}" />',
    viewBox: '0 0 512 512'
}
`;
}

function fontFileTemplate(fontFile) {
    const base64 = fs.readFileSync(fontFile).toString("base64");

    return `$ki-font-data-url: "data:font/ttf;base64,${base64}" !default;
@if $ki-embed-font {
    $ki-font-url: $ki-font-data-url !global;
}
`;
}

function fontHtmlTemplate(icons) {

    return `<!doctype html>
<html lang="en" class="k-typography k-no-animations">
<head>
    <title>Icons</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="/dist.css" />

    <style>
        #test-area {
            padding: 20px;
            display: grid;
            grid-template-columns: repeat(32, min-content);
            gap: 20px;
            align-items: top;
        }
    </style>
</head>
<body>


    <div id="#test-area">${ icons.map( icon => `
        <span class="k-icon k-i-${icon.name}"></span>` ).join('') }
    </div>

</body>
</html>
`;
}

module.exports = {
    svgFontTemplate,
    svgTsTemplate,
    indexTsTemplate,
    fontFileTemplate,
    fontHtmlTemplate
}
