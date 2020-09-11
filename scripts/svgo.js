const SVGO = require('svgo');
const svgo = new SVGO({
    floatPrecision: 4,
    plugins: [
        { cleanupAttrs: true },
        { cleanupEnableBackground: true },
        { cleanupIDs: true },
        { cleanupListOfValues: true },
        { cleanupNumericValues: true },
        { collapseGroups: true },
        { convertColors: true },
        { convertPathData: true },
        { convertTransform: true },
        { convertShapeToPath: true },
        { convertStyleToAttrs: true },
        { mergePaths: true },
        { minifyStyles: true },
        { moveElemsAttrsToGroup: true },
        { moveGroupAttrsToElems: true },
        { removeDoctype: true },
        { removeXMLProcInst: true },
        { removeComments: true },
        { removeMetadata: true },
        { removeTitle: true },
        { removeDesc: true },
        { removeUselessDefs: true },
        { removeXMLNS: true },
        { removeEditorsNSData: true },
        { removeEmptyAttrs: true },
        { removeHiddenElems: true },
        { removeEmptyText: true },
        { removeEmptyContainers: true },
        { removeViewBox: true },
        { removeUnknownsAndDefaults: true },
        { removeNonInheritableGroupAttrs: true },
        {
            removeUselessStrokeAndFill: {
                // https://github.com/svg/svgo/issues/727#issuecomment-303115276
                removeNone: true,
            },
        },
        { removeUnusedNS: true },
        { removeRasterImages: true },
        { removeDimensions: true },
        { removeAttrs: { attrs: '(stroke.*|fill.*|base.*|data.*|clip.*|overflow)' } },
        { removeElementsByAttr: true },
        { removeStyleElement: true },
        { removeScriptElement: true },
        { sortAttrs: true },
    ],
    js2svg: {
        pretty: true
    }
});

module.exports = svgo;
