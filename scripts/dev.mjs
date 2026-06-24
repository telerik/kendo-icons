/**
 * Lightweight dev server for local icon preview with live reload.
 *
 * Routes:
 *   /font-icons/*   → packages/font-icons/dist/
 *   /svg-icons/*    → packages/svg-icons/dist/
 *   /telerik-icons/*→ src/telerik-icons/
 *   /docs/*         → docs/
 *   /               → redirect to /docs/
 *
 * Live reload is injected into HTML responses via Server-Sent Events.
 * File watching uses chokidar (already a transitive dependency).
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exec } from 'node:child_process';
import { watch } from 'chokidar';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PORT = 7777;

const ROUTES = [
    { prefix: '/font-icons',    dir: path.join(ROOT, 'packages/font-icons/dist') },
    { prefix: '/svg-icons',     dir: path.join(ROOT, 'packages/svg-icons/dist') },
    { prefix: '/telerik-icons', dir: path.join(ROOT, 'src/telerik-icons') },
    { prefix: '/docs',          dir: path.join(ROOT, 'docs') },
];

const MIME = {
    '.html':  'text/html; charset=utf-8',
    '.css':   'text/css',
    '.js':    'application/javascript',
    '.mjs':   'application/javascript',
    '.json':  'application/json',
    '.svg':   'image/svg+xml',
    '.ttf':   'font/ttf',
    '.woff':  'font/woff',
    '.woff2': 'font/woff2',
    '.eot':   'application/vnd.ms-fontobject',
    '.png':   'image/png',
    '.ico':   'image/x-icon',
};

const SSE_PATH = '/__dev/reload';

// SSE clients waiting for reload events
const clients = new Set();

const LIVERELOAD_SNIPPET = `\n<script>
(function () {
    const es = new EventSource('${SSE_PATH}');
    es.addEventListener('reload', () => location.reload());
    es.onerror = () => setTimeout(() => location.reload(), 500);
})();
</script>`;

// ── SSE handler ────────────────────────────────────────────────────────────────
function handleSse(req, res) {
    res.writeHead(200, {
        'Content-Type':  'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection':    'keep-alive',
    });
    res.write(': connected\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
}

function broadcastReload() {
    for (const res of clients) {
        res.write('event: reload\ndata: \n\n');
    }
}

// ── File serving ───────────────────────────────────────────────────────────────
function serveFile(filePath, baseDir, res) {
    const resolved = path.resolve(filePath);

    // Prevent path traversal
    if (!resolved.startsWith(baseDir + path.sep) && resolved !== baseDir) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.readFile(resolved, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Not Found');
            return;
        }
        const mime = MIME[path.extname(resolved).toLowerCase()] ?? 'application/octet-stream';
        let body = data;
        if (mime.includes('text/html')) {
            body = Buffer.from(data.toString().replace('</body>', LIVERELOAD_SNIPPET + '\n</body>'));
        }
        res.writeHead(200, { 'Content-Type': mime });
        res.end(body);
    });
}

// ── Request handler ────────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
    const urlPath = new URL(req.url, 'http://localhost').pathname;

    if (urlPath === SSE_PATH) {
        handleSse(req, res);
        return;
    }

    // Redirect bare root to /docs/
    if (urlPath === '/') {
        res.writeHead(302, { Location: '/docs/' });
        res.end();
        return;
    }

    for (const { prefix, dir } of ROUTES) {
        if (urlPath !== prefix && !urlPath.startsWith(prefix + '/')) continue;

        const rel = urlPath.slice(prefix.length).replace(/^\//, '');
        let filePath = path.join(dir, rel);

        // Resolve directory to index.html
        try {
            if (fs.statSync(filePath).isDirectory()) {
                filePath = path.join(filePath, 'index.html');
            }
        } catch {
            // stat failed → file doesn't exist, handled below
        }

        if (fs.existsSync(filePath)) {
            serveFile(filePath, dir, res);
            return;
        }
    }

    res.writeHead(404);
    res.end('Not Found');
});

// ── File watcher ───────────────────────────────────────────────────────────────
const watchPaths = [
    path.join(ROOT, 'docs'),
    path.join(ROOT, 'packages/font-icons/dist'),
    path.join(ROOT, 'packages/svg-icons/dist'),
    path.join(ROOT, 'src/telerik-icons'),
];

const watcher = watch(watchPaths, { ignoreInitial: true });
watcher.on('change', (file) => {
    console.log(`  changed: ${path.relative(ROOT, file)}`);
    broadcastReload();
});

// ── Startup ────────────────────────────────────────────────────────────────────
function warnMissingDist(pkg, cmd) {
    const dir = path.join(ROOT, 'packages', pkg, 'dist');
    if (!fs.existsSync(dir)) {
        console.warn(`  ⚠  packages/${pkg}/dist not found — run: ${cmd}`);
    }
}

server.listen(PORT, '127.0.0.1', () => {
    const url = `http://localhost:${PORT}/docs/`;
    console.log(`\n  Icons dev server → ${url}\n`);
    warnMissingDist('font-icons', 'npm run build -w packages/font-icons');
    warnMissingDist('svg-icons',  'npm run build -w packages/svg-icons');
    exec(`open "${url}"`);
});
