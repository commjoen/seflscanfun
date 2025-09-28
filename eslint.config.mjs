// ESLint configuration for Albert Heijn Self-Scanner project
// Using the new flat config format with neostandard
import neostandard from 'neostandard';

export default [
    ...neostandard({
        // Override neostandard's stylistic preferences to match existing code style
        stylistic: {
            indent: 4,
            semi: true,
            quotes: 'single'
        }
    }),
    {
        languageOptions: {
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
            }
        },
        rules: {
            // Custom rules for the self-scanner app
            'no-unused-vars': ['error', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            }],
            'no-console': 'warn',
            'no-debugger': 'error',
            'no-var': 'error',
            'prefer-const': 'error',

            // Style rules - ensure consistency with existing code
            '@stylistic/indent': ['error', 4, { SwitchCase: 1 }],
            '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/space-before-function-paren': ['error', 'never'],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/array-bracket-spacing': ['error', 'never'],

            // Best practices for self-scanner app
            eqeqeq: ['error', 'always'],
            curly: ['error', 'all'],
            '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
            camelcase: ['error', { properties: 'never' }],
            '@stylistic/no-trailing-spaces': 'error',
            '@stylistic/eol-last': 'error',

            // Security rules (important for web app)
            'no-eval': 'error',
            'no-implied-eval': 'error',
            'no-new-func': 'error',
            'no-script-url': 'error'
        }
    },
    {
        files: ['sw.js'],
        languageOptions: {
            globals: {
                // Service Worker globals
                self: 'readonly',
                caches: 'readonly',
                fetch: 'readonly'
            }
        },
        rules: {
            'no-console': 'off' // Allow console in service worker
        }
    },
    {
        files: ['test*.js', 'tests/**/*.js'],
        languageOptions: {
            globals: {
                // Test-specific globals
                describe: 'readonly',
                it: 'readonly',
                before: 'readonly',
                after: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly'
            }
        },
        rules: {
            'no-console': 'off' // Allow console in tests
        }
    },
    {
        files: ['server.js', 'test-runner.js'],
        rules: {
            'no-console': 'off' // Allow console in server files
        }
    },
    {
        ignores: [
            'node_modules/',
            'dist/',
            'build/',
            '.git/',
            'package-lock.json',
            '*.min.js'
        ]
    }
];
