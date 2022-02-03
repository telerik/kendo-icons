function svgTsTemplate(options) {
    const { iconName, iconTsName, iconSvgContent } = options;

    return `import { SVGIcon } from '../svg-icon.interface';

export const ${iconTsName}: SVGIcon = {
    name: '${iconName}',
    content: '<path d="${iconSvgContent}" />',
    viewBox: '0 0 512 512'
}\n`;
}

function indexTsTemplate(options) {

    return `export { SVGIcon } from './svg-icon.interface';

${options.map(icon => `export { ${icon.iconTsName} } from './icons/${icon.iconName}';`).join('\n')}\n`;
}


module.exports.svgTsTemplate = svgTsTemplate;
module.exports.indexTsTemplate = indexTsTemplate;
