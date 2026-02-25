#!/usr/bin/env node

// Node.js test runner for Albert Heijn Zelfscanner tests
// This allows running the browser-based tests in a CI/CD environment

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { SimplifiedAppTester } = require('./tests/integration-tests');

async function runProductTests() {
    console.log('🧪 Running Product Database Tests...\n');

    // Load the test.html file to extract test logic
    const testHtmlPath = path.join(__dirname, 'test.html');
    let testHtml = fs.readFileSync(testHtmlPath, 'utf8');

    // Load the products.js file separately
    const productsJsPath = path.join(__dirname, 'products.js');
    const productsJs = fs.readFileSync(productsJsPath, 'utf8');

    // Replace the external script tag with inline script content
    testHtml = testHtml.replace(
        '<script src="products.js"></script>',
        `<script>${productsJs}</script>`
    );

    // Create a DOM environment
    const dom = new JSDOM(testHtml, {
        runScripts: 'dangerously',
        resources: 'usable',
        url: 'http://localhost:8000/'
    });

    const { window } = dom;
    global.window = window;
    global.document = window.document;
    global.navigator = window.navigator;

    // Wait for tests to complete
    await new Promise((resolve) => {
        const checkInterval = setInterval(() => {
            const summaryEl = window.document.getElementById('test-summary');
            if (summaryEl && summaryEl.innerHTML.includes('Total:')) {
                clearInterval(checkInterval);
                resolve();
            }
        }, 100);

        // Timeout after 10 seconds
        setTimeout(() => {
            clearInterval(checkInterval);
            resolve();
        }, 10000);
    });

    // Extract test results
    const resultsEl = window.document.getElementById('test-results');
    const summaryEl = window.document.getElementById('test-summary');

    if (!resultsEl || !summaryEl) {
        throw new Error('Test elements not found');
    }

    // Parse results
    const resultDivs = resultsEl.querySelectorAll('.test-result');
    let passed = 0;
    let failed = 0;

    console.log('📋 Product Database Test Results:');
    console.log('=================================');

    resultDivs.forEach((div) => {
        const text = div.textContent;
        if (div.classList.contains('test-pass')) {
            console.log(`✅ ${text}`);
            passed++;
        } else if (div.classList.contains('test-fail')) {
            console.log(`❌ ${text}`);
            failed++;
        }
    });

    console.log('\n📊 Product Tests Summary:');
    console.log('=========================');
    console.log(`Total: ${passed + failed}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);

    return { passed, failed };
}

async function runAllTests() {
    let totalPassed = 0;
    let totalFailed = 0;

    try {
        // Run product database tests
        const productResults = await runProductTests();
        totalPassed += productResults.passed;
        totalFailed += productResults.failed;

        console.log('\n' + '='.repeat(50) + '\n');

        // Run application integration tests
        const appTester = new SimplifiedAppTester();
        const _appTestsSuccess = await appTester.runTests();
        totalPassed += appTester.passCount;
        totalFailed += appTester.failCount;

        console.log('\n' + '='.repeat(50));
        console.log('🎯 OVERALL TEST SUMMARY');
        console.log('='.repeat(50));
        console.log(`Total Tests: ${totalPassed + totalFailed}`);
        console.log(`Passed: ${totalPassed}`);
        console.log(`Failed: ${totalFailed}`);
        console.log(`Success Rate: ${((totalPassed / (totalPassed + totalFailed)) * 100).toFixed(1)}%`);

        // Exit with appropriate code
        if (totalFailed > 0) {
            console.log('\n❌ Some tests failed!');
            process.exit(1);
        } else {
            console.log('\n✅ All tests passed!');
            process.exit(0);
        }
    } catch(error) {
        console.error('❌ Error running tests:', error.message);
        process.exit(1);
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    runAllTests();
}

module.exports = { runAllTests, runProductTests };
