const { sassBuild } = require('@progress/kendo-theme-tasks');

sassBuild({
    file: 'scss/index.scss',
    output: {
        path: 'dist/',
        filename: '[name].css'
    }
});
