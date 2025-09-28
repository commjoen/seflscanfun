// Simple Node.js HTTP server for Albert Heijn Self-Scanner - no dependencies
import http from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;

// MIME types mapping
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return mimeTypes[ext] || 'application/octet-stream';
}

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    // Health check endpoint
    if (pathname === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            version: '1.0.0'
        }));
        return;
    }

    // Determine file path
    let filePath;
    if (pathname === '/') {
        filePath = path.join(__dirname, 'index.html');
    } else {
        filePath = path.join(__dirname, pathname);
    }

    // Security check - prevent directory traversal
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
            return;
        }

        // Read and serve the file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Server error');
                return;
            }

            const mimeType = getMimeType(filePath);
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(data);
        });
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Albert Heijn Self-Scanner running on http://localhost:${PORT}`);
    console.log(`📱 Access the application at http://localhost:${PORT}`);
    console.log(`🔍 Health check available at http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down Albert Heijn Self-Scanner...');
    server.close(() => process.exit(0));
});

process.on('SIGTERM', () => {
    console.log('\n👋 Shutting down Albert Heijn Self-Scanner...');
    server.close(() => process.exit(0));
});
