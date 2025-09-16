# Testing Guide - Albert Heijn Zelfscanner

This document describes the testing infrastructure for the Albert Heijn Zelfscanner project.

## Test Structure

The project includes comprehensive testing at multiple levels:

### 1. Product Database Tests (`test.html`)
- **Location**: `test.html` (browser-based tests)
- **Coverage**: Product database functionality
- **Tests**: 10 comprehensive tests
- **Run via**: Open `http://localhost:8000/test.html` in browser

Tests included:
- Products database validation
- Product lookup functions
- Search functionality
- Category filtering
- Price validation
- Dutch language validation

### 2. Application Integration Tests
- **Location**: `tests/integration-tests.js`
- **Coverage**: File structure, HTML/CSS/JS validation
- **Tests**: 8 integration tests
- **Run via**: `npm test` command

Tests included:
- File structure validation
- HTML structure and branding
- CSS styling and responsiveness
- JavaScript class structure
- Service Worker configuration
- Package configuration
- HTML well-formedness
- File size validation

## Running Tests

### Command Line (CI/CD Compatible)
```bash
npm test
```
This runs all tests in a Node.js environment suitable for CI/CD pipelines.

### Browser Testing
```bash
# Start development server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000/test.html
```

### Alternative Start Command
```bash
npm run test:browser
```

## GitHub Actions Integration

Tests are automatically executed in GitHub Actions on:
- Push to `main` branch
- Pull requests to `main` branch

The workflow:
1. Sets up Node.js environment
2. Installs dependencies
3. Runs all tests via `npm test`
4. Deploys to GitHub Pages (on main branch)

## Test Results

### Expected Results
- **Total Tests**: 18
- **Success Rate**: 100%
- **Coverage**: 
  - Product database functionality ✅
  - Application structure ✅
  - File integrity ✅
  - Branding compliance ✅
  - Responsive design ✅

### Test Output Example
```
🧪 Running Product Database Tests...
✅ Products database should be defined
✅ Products database should contain products
✅ All products should have required fields
...

🚀 Running Application Integration Tests...
✅ Required files should exist
✅ HTML should have required structure
✅ CSS should have Albert Heijn styling
...

🎯 OVERALL TEST SUMMARY
Total Tests: 18
Passed: 18
Failed: 0
Success Rate: 100.0%
✅ All tests passed!
```

## Adding New Tests

### Product Database Tests
Edit `test.html` and add tests to the `TestRunner` instance:

```javascript
runner.test('Your test name', () => {
    runner.assert(condition, 'Error message');
});
```

### Integration Tests
Edit `tests/integration-tests.js` and add tests to the `runTests()` method:

```javascript
this.test('Your test name', () => {
    this.assert(condition, 'Error message');
});
```

## Dependencies

- **jsdom**: DOM simulation for Node.js testing
- **Node.js 18+**: Runtime environment
- **Python 3**: Development server

## Continuous Integration

The test suite is designed to:
- Run quickly (< 30 seconds)
- Provide clear feedback
- Exit with appropriate codes for CI/CD
- Work in headless environments
- Validate all critical functionality

For more information, see the GitHub Actions workflow in `.github/workflows/deploy.yml`.