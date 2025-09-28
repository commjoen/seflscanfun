// ESLint configuration for Albert Heijn Self-Scanner project
module.exports = {
    extends: ['standard'],
    env: {
        browser: true,
        node: true,
        es2022: true
    },
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
    },
    globals: {
        // Albert Heijn Self-Scanner specific globals
        SelfScannerApp: 'readonly',
        products: 'readonly',
        findProductByBarcode: 'readonly',
        getRandomProducts: 'readonly',
        searchProductsByName: 'readonly',
        getAllCategories: 'readonly',
        getProductsByCategory: 'readonly',
        APP_VERSION: 'readonly',
        displayVersionInfo: 'readonly',
        TestRunner: 'readonly',
        SimplifiedAppTester: 'readonly',
        // Third-party libraries
        Quagga: 'readonly',
        jsdom: 'readonly',
        JSDOM: 'readonly'
    },
    rules: {
        // Code quality rules
        'no-unused-vars': ['error', {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_'
        }],
        'no-console': 'warn',
        'no-debugger': 'error',
        'no-var': 'error',
        'prefer-const': 'error',

        // Style rules (align with standard config)
        indent: ['error', 4, { SwitchCase: 1 }],
        quotes: ['error', 'single', { avoidEscape: true }],
        semi: ['error', 'always'],
        'space-before-function-paren': ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],
        'array-bracket-spacing': ['error', 'never'],

        // Best practices for self-scanner app
        eqeqeq: ['error', 'always'],
        curly: ['error', 'all'],
        'brace-style': ['error', '1tbs', { allowSingleLine: true }],
        camelcase: ['error', { properties: 'never' }],
        'no-trailing-spaces': 'error',
        'eol-last': 'error',

        // Security rules (important for web app)
        'no-eval': 'error',
        'no-implied-eval': 'error',
        'no-new-func': 'error',
        'no-script-url': 'error'
    },
    overrides: [
        {
            files: ['test*.js', 'tests/**/*.js'],
            env: {
                mocha: true
            },
            globals: {
                // Test-specific globals
                describe: 'readonly',
                it: 'readonly',
                before: 'readonly',
                after: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly'
            },
            rules: {
                'no-console': 'off' // Allow console in tests
            }
        },
        {
            files: ['server.js', 'test-runner.js'],
            env: {
                node: true
            },
            rules: {
                'no-console': 'off' // Allow console in server files
            }
        }
    ],
    ignorePatterns: [
        'node_modules/',
        'dist/',
        'build/',
        '.git/',
        'package-lock.json',
        '*.min.js'
    ]
};
