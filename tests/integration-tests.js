// Simplified Integration Tests
// Focus on testing core functionality that can be reliably tested in Node.js environment

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

class SimplifiedAppTester {
    constructor() {
        this.testResults = [];
        this.passCount = 0;
        this.failCount = 0;
    }

    test(name, fn) {
        try {
            fn();
            this.testResults.push({ name, status: 'PASS' });
            this.passCount++;
        } catch (error) {
            this.testResults.push({ name, status: 'FAIL', error: error.message });
            this.failCount++;
        }
    }

    assert(condition, message) {
        if (!condition) {
            throw new Error(message || 'Assertion failed');
        }
    }

    assertEqual(actual, expected, message) {
        if (actual !== expected) {
            throw new Error(message || `Expected ${expected}, got ${actual}`);
        }
    }

    async runTests() {
        console.log('🚀 Running Application Integration Tests...\n');
        
        // Test 1: File Structure
        this.test('Required files should exist', () => {
            const requiredFiles = ['index.html', 'app.js', 'products.js', 'styles.css', 'sounds.js', 'sw.js'];
            requiredFiles.forEach(file => {
                const filePath = path.join(__dirname, '..', file);
                this.assert(fs.existsSync(filePath), `File ${file} should exist`);
            });
        });

        // Test 2: HTML Structure
        this.test('HTML should have required structure', () => {
            const htmlPath = path.join(__dirname, '..', 'index.html');
            const htmlContent = fs.readFileSync(htmlPath, 'utf8');
            
            this.assert(htmlContent.includes('Albert Heijn'), 'HTML should contain Albert Heijn branding');
            this.assert(htmlContent.includes('Zelfscanner'), 'HTML should contain Zelfscanner text');
            this.assert(htmlContent.includes('id="barcodeInput"'), 'HTML should have barcode input field');
            this.assert(htmlContent.includes('id="scanButton"'), 'HTML should have scan button');
            this.assert(htmlContent.includes('id="cartItems"'), 'HTML should have cart items container');
        });

        // Test 3: CSS Styling
        this.test('CSS should have Albert Heijn styling', () => {
            const cssPath = path.join(__dirname, '..', 'styles.css');
            const cssContent = fs.readFileSync(cssPath, 'utf8');
            
            this.assert(cssContent.includes('#0066CC') || cssContent.includes('#003082'), 'CSS should contain Albert Heijn blue color');
            this.assert(cssContent.includes('responsive') || cssContent.includes('@media'), 
                'CSS should have responsive design elements');
        });

        // Test 4: JavaScript Structure
        this.test('JavaScript files should have required classes and functions', () => {
            const appJsPath = path.join(__dirname, '..', 'app.js');
            const appJsContent = fs.readFileSync(appJsPath, 'utf8');
            
            this.assert(appJsContent.includes('class SelfScannerApp'), 'app.js should contain SelfScannerApp class');
            this.assert(appJsContent.includes('scanProduct'), 'app.js should have scanProduct functionality');
            this.assert(appJsContent.includes('addToCart') || appJsContent.includes('cart'), 'app.js should have cart functionality');
            
            const productsJsPath = path.join(__dirname, '..', 'products.js');
            const productsJsContent = fs.readFileSync(productsJsPath, 'utf8');
            
            this.assert(productsJsContent.includes('PRODUCTS_DATABASE'), 'products.js should contain PRODUCTS_DATABASE');
            this.assert(productsJsContent.includes('findProductByBarcode'), 'products.js should have findProductByBarcode function');
        });

        // Test 5: Service Worker
        this.test('Service Worker should be configured', () => {
            const swPath = path.join(__dirname, '..', 'sw.js');
            this.assert(fs.existsSync(swPath), 'Service Worker file should exist');
            
            const swContent = fs.readFileSync(swPath, 'utf8');
            this.assert(swContent.includes('cache'), 'Service Worker should implement caching');
        });

        // Test 6: Package Configuration
        this.test('Package.json should be properly configured', () => {
            const packagePath = path.join(__dirname, '..', 'package.json');
            const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
            
            this.assert(packageContent.name === 'seflscanfun', 'Package name should be seflscanfun');
            this.assert(packageContent.scripts && packageContent.scripts.test, 'Package should have test script');
            this.assert(packageContent.dependencies || packageContent.devDependencies, 'Package should have dependencies');
        });

        // Test 7: HTML Validation (Basic)
        this.test('HTML should be well-formed', () => {
            const htmlPath = path.join(__dirname, '..', 'index.html');
            const htmlContent = fs.readFileSync(htmlPath, 'utf8');
            
            const dom = new JSDOM(htmlContent);
            this.assert(dom.window.document.title, 'HTML should have a title');
            this.assert(dom.window.document.head, 'HTML should have a head section');
            this.assert(dom.window.document.body, 'HTML should have a body section');
            
            // Check for required meta tags
            const viewport = dom.window.document.querySelector('meta[name="viewport"]');
            this.assert(viewport, 'HTML should have viewport meta tag for responsive design');
        });

        // Test 8: File Sizes (Reasonable)
        this.test('Files should have reasonable sizes', () => {
            const checkFileSize = (filename, minSize, maxSize) => {
                const filePath = path.join(__dirname, '..', filename);
                const stats = fs.statSync(filePath);
                this.assert(stats.size >= minSize, `${filename} should be at least ${minSize} bytes`);
                this.assert(stats.size <= maxSize, `${filename} should be no more than ${maxSize} bytes`);
            };
            
            checkFileSize('index.html', 1000, 50000);  // 1KB - 50KB
            checkFileSize('app.js', 5000, 100000);     // 5KB - 100KB  
            checkFileSize('styles.css', 3000, 50000);  // 3KB - 50KB
            checkFileSize('products.js', 1000, 50000); // 1KB - 50KB
        });

        this.printResults();
        return this.failCount === 0;
    }

    printResults() {
        console.log('📋 Application Test Results:');
        console.log('=============================');
        
        this.testResults.forEach(result => {
            if (result.status === 'PASS') {
                console.log(`✅ ${result.name}`);
            } else {
                console.log(`❌ ${result.name}: ${result.error}`);
            }
        });
        
        console.log('\n📊 Summary:');
        console.log('===========');
        console.log(`Total: ${this.testResults.length}`);
        console.log(`Passed: ${this.passCount}`);
        console.log(`Failed: ${this.failCount}`);
        console.log(`Success Rate: ${((this.passCount / this.testResults.length) * 100).toFixed(1)}%`);
    }
}

module.exports = { SimplifiedAppTester };