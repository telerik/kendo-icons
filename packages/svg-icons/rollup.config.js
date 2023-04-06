import typescript from 'rollup-plugin-typescript2';

export default [
    {
        // ESM bundle
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.es.js',
                format: 'es'
            }
        ],
        plugins: [
            typescript({
                tsconfig: './tsconfig.es.json'
            })
        ]
    },
    {
        // UMD bundles
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.js',
                format: 'umd',
                name: 'KendoSVGIcons'
            }
        ],
        plugins: [
            typescript({
                tsconfig: './tsconfig.json'
            })
        ]
    }
];
