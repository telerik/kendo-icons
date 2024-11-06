const { sassBuild } = require('@progress/kendo-theme-tasks');

sassBuild({
    file: 'scss/all.scss',
    output: {
        path: 'dist/',
        filename: 'index.css'
    }
});
