# Contributing to Albert Heijn Self-Scanner

Thank you for your interest in contributing to the Albert Heijn Self-Scanner project! This document provides guidelines and information about the development setup and tooling.

## 🛠️ Development Setup

### Prerequisites
- **Node.js**: Version 20+ (recommended) or 18+
- **npm**: Version 8+ (comes with Node.js)
- **Git**: For version control
- **pre-commit**: For code quality hooks (optional but recommended)

### Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/commjoen/seflscanfun.git
   cd seflscanfun
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   # or
   npm run dev
   ```

4. **Run tests:**
   ```bash
   npm test
   ```

## 🔍 Code Quality Tools

### ESLint (JavaScript Linting)
We use ESLint with the Standard configuration to maintain code quality.

```bash
# Check for linting issues
npm run lint:check

# Automatically fix linting issues
npm run lint
```

**Configuration:** `.eslintrc.js`

### Prettier (Code Formatting)
Prettier ensures consistent code formatting across the project.

```bash
# Check formatting
npm run format:check

# Apply formatting
npm run format
```

**Configuration:** `.prettierrc.json`

### Pre-commit Hooks
Pre-commit hooks automatically run quality checks before each commit.

#### Installation
```bash
# Install pre-commit (requires Python)
pip install pre-commit

# Install hooks
pre-commit install
```

#### Manual execution
```bash
# Run all hooks on all files
pre-commit run --all-files

# Run specific hook
pre-commit run eslint --all-files
```

**Configuration:** `.pre-commit-config.yaml`

#### Included Hooks
- **Code Quality:**
  - ESLint for JavaScript linting
  - Prettier for code formatting
  - Trailing whitespace removal
  - End-of-file fixers

- **Security:**
  - Secret detection
  - Private key detection

- **File Validation:**
  - JSON, YAML, XML validation
  - HTML structure validation
  - CSS syntax checking

- **Project-Specific:**
  - Albert Heijn branding validation
  - Package.json validation

- **Git:**
  - Merge conflict detection
  - Commit message validation (conventional commits)

## 🤖 Dependabot

Dependabot automatically creates pull requests to keep dependencies up-to-date.

**Configuration:** `.github/dependabot.yml`

### Update Schedule
- **npm dependencies**: Weekly on Mondays at 04:00 CET
- **GitHub Actions**: Weekly on Mondays at 04:30 CET
- **Docker dependencies**: Weekly on Tuesdays at 04:00 CET

### PR Limits
- npm: 5 open PRs maximum
- GitHub Actions: 3 open PRs maximum
- Docker: 2 open PRs maximum

## 📝 Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples
```bash
git commit -m "feat: add barcode scanning sound effects"
git commit -m "fix(cart): resolve quantity update bug"
git commit -m "docs: update README with Docker instructions"
git commit -m "chore(deps): update express to v5.1.0"
```

## 🧪 Testing

### Test Structure
- **Product Database Tests**: 13 tests validating product data and functions
- **Application Integration Tests**: 8 tests validating app structure and functionality
- **Total**: 21 comprehensive tests

### Running Tests
```bash
# Run all tests (CLI)
npm test

# Run tests in browser
npm run test:browser
# Then open http://localhost:8000/test.html
```

### Test Files
- `test-runner.js`: Node.js test runner for CI/CD
- `test.html`: Browser-based test suite
- `tests/integration-tests.js`: Application integration tests

## 🎨 Albert Heijn Branding Guidelines

### Colors
- **Primary Blue**: `#0066CC`
- **Dark Blue**: `#004499`
- **Orange**: `#FF6600`
- **Green**: `#00AA44`
- **Light Grey**: `#F5F5F5`

### Requirements
- Maintain Albert Heijn branding in UI elements
- Use Dutch language for user-facing text
- Follow mobile-first responsive design principles
- Include accessibility features

## 🚀 CI/CD Pipeline

### GitHub Actions Workflows
1. **Deploy** (`.github/workflows/deploy.yml`): Tests and deploys to GitHub Pages
2. **Docker** (`.github/workflows/docker.yml`): Builds and publishes Docker images
3. **Release** (`.github/workflows/release.yml`): Automated semantic versioning and releases

### Quality Gates
All PRs must pass:
- ✅ All tests (21 tests)
- ✅ ESLint validation
- ✅ Pre-commit hooks
- ✅ Dependabot security checks

## 🐛 Issue Reporting

When reporting issues:
1. Check existing issues first
2. Use the issue templates if available
3. Include browser/Node.js version
4. Provide minimal reproduction steps
5. Include relevant console errors or screenshots

## 📄 License

This project is for educational purposes. Albert Heijn is a registered trademark of Ahold Delhaize.

---

For questions or help, please open an issue or contact the maintainers.