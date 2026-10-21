const http = require('http');
const fs = require('fs');
const path = require('path');

const FRONTEND_DIR = path.join(__dirname, 'frontend');
const BACKEND_URL = 'http://127.0.0.1:5000';


const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf'
};

function proxyRequest(req, res, targetUrl) {
  const target = new URL(req.url, targetUrl);
  const options = {
    hostname: target.hostname,
    port: target.port,
    path: target.pathname + target.search,
    method: req.method,
    headers: {
      ...req.headers,
      host: target.host
    }
  };

  const proxy = http.request(options, (targetRes) => {
    res.writeHead(targetRes.statusCode, targetRes.headers);
    targetRes.pipe(res);
  });

  proxy.on('error', (err) => {
    console.error(`[Proxy Error] ${req.url} -> ${err.message}`);
    res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Backend unreachable on ' + BACKEND_URL, details: err.message }));
  });

  req.pipe(proxy);
}

function serveStatic(req, res) {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(FRONTEND_DIR, safePath);

  // Clean URLs support: /tour -> tour.html, /admin -> admin.html
  if (!path.extname(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  // Security check: ensure path is within FRONTEND_DIR
  if (!filePath.startsWith(FRONTEND_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Check if it's a directory with index.html
      const tryIndex = path.join(filePath, 'index.html');
      if (fs.existsSync(tryIndex)) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return fs.createReadStream(tryIndex).pipe(res);
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end(`File not found: ${pathname}`);
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

function handleRequest(req, res) {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // Proxy /api, /swagger, /health to ASP.NET Core backend
  if (pathname.startsWith('/api') || pathname.startsWith('/swagger') || pathname.startsWith('/health')) {
    return proxyRequest(req, res, BACKEND_URL);
  }

  // Serve static frontend files
  return serveStatic(req, res);
}

function createServer(port) {
  const server = http.createServer(handleRequest);
  server.listen(port, () => {
    console.log(`[DevServer] Serving Luxury Machupicchu at http://localhost:${port}`);
    console.log(`[DevServer]   - Admin Panel: http://localhost:${port}/admin.html`);
    console.log(`[DevServer]   - Checkout Portal: http://localhost:${port}/checkout.html`);
    console.log(`[DevServer]   - Tour Catalog: http://localhost:${port}/`);
    console.log(`[DevServer]   - Proxy to Backend API: ${BACKEND_URL}`);
  });
  return server;
}

// Supervisor watchdog for ASP.NET Core backend
const { spawn } = require('child_process');
let backendProcess = null;
let isShuttingDown = false;

function isBackendRunning() {
  return new Promise((resolve) => {
    const req = http.get('http://127.0.0.1:5000/health', (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(1500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function startBackend() {
  if (isShuttingDown) return;
  const running = await isBackendRunning();
  if (running) {
    console.log('[DevServer] Backend is already active on http://localhost:5000.');
    return;
  }

  const dllPath = path.join(__dirname, 'backend', 'src', 'LuxuryMachupicchu.API', 'bin', 'Debug', 'net9.0', 'LuxuryMachupicchu.API.dll');
  if (!fs.existsSync(dllPath)) {
    console.log('[DevServer] Backend DLL not found at: ' + dllPath);
    return;
  }

  console.log('[DevServer] Spawning ASP.NET Core backend (http://localhost:5000)...');
  backendProcess = spawn('dotnet', [dllPath, '--urls', 'http://localhost:5000'], {
    cwd: path.join(__dirname, 'backend', 'src', 'LuxuryMachupicchu.API'),
    env: { ...process.env, ASPNETCORE_ENVIRONMENT: 'Development' },
    stdio: 'ignore'
  });


  backendProcess.on('exit', (code) => {
    if (!isShuttingDown) {
      console.log(`[DevServer] Backend process exited (${code}). Auto-restarting in 2s...`);
      setTimeout(startBackend, 2000);
    }
  });
}

process.on('SIGINT', () => {
  isShuttingDown = true;
  if (backendProcess) backendProcess.kill();
  process.exit();
});

process.on('SIGTERM', () => {
  isShuttingDown = true;
  if (backendProcess) backendProcess.kill();
  process.exit();
});

// Start backend supervisor
startBackend();

// Start on ports 3000 and 8080 for seamless access
createServer(3000);
createServer(8080);


