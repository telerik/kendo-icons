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

module.exports.fontHtmlTemplate = fontHtmlTemplate;
