# Albert Heijn Self-Scanner Fun Simulation

Albert Heijn Self-Scanner Fun (seflscanfun) is a web application project that simulates an Albert Heijn self-scanner system. The project aims to create an educational and fun simulation including barcode scanning, digital receipts, shopping cart management, checkout simulation, and responsive UI for tablet/phone interfaces.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Environment Setup and Bootstrap
- Clone the repository: `git clone https://github.com/commjoen/seflscanfun.git`
- Navigate to project directory: `cd seflscanfun`
- Check current branch: `git --no-pager branch`
- Check repository status: `git --no-pager status`

### Development Environment Requirements
Available tools in the development environment:
- **Node.js v20.19.5** with **npm v10.8.2** - Primary web development runtime
- **Python 3.12.3** - Alternative backend/scripting support  
- **Git 2.51.0** - Version control
- **curl** - HTTP testing and API validation

### Project Initialization (For New Web Application)
The repository is currently minimal with only a README.md. When implementing the Albert Heijn self-scanner simulation:

1. **Initialize Node.js project:**
   ```bash
   npm init -y
   ```
   - Takes ~1 second to complete
   - Creates package.json for dependency management

2. **Install core dependencies:**
   ```bash
   npm install express
   ```
   - Takes ~2-5 seconds for typical web framework installation
   - For frontend-only development, consider using static file serving

3. **Install development dependencies:**
   ```bash
   npm install -g live-server  # For static file serving
   ```
   - Takes ~10-15 seconds to install
   - Provides hot-reload development server

### Building and Running

#### For Static Web Application (Recommended Start)
1. **Create basic HTML structure:**
   - Create `index.html` in project root
   - Include Albert Heijn color scheme and branding
   - Implement responsive design for tablet/phone

2. **Development server:**
   ```bash
   python3 -m http.server 8000
   ```
   - Starts immediately (< 1 second)
   - Serves files on http://localhost:8000
   - **NEVER CANCEL** - Keep server running during development
   - Alternative: `live-server` for auto-reload functionality

3. **Validation:**
   ```bash
   curl -s http://localhost:8000/ | head -5
   ```
   - Should return HTML content immediately
   - Validates server is working correctly

#### For Express.js Application (Advanced)
1. **Install and setup:**
   ```bash
   npm install express
   ```

2. **Create app.js server file**

3. **Start server:**
   ```bash
   node app.js
   ```
   - Starts immediately (< 1 second)
   - **NEVER CANCEL** - Keep server running during development

### Testing and Validation

#### Manual Validation Requirements
**CRITICAL**: After any changes to the web application, ALWAYS manually validate through complete user scenarios:

1. **Core Self-Scanner Workflow:**
   - Navigate to the application URL
   - Test "scanning" products (simulate barcode entry)
   - Verify products appear in shopping cart
   - Test cart quantity modifications
   - Proceed through checkout process
   - Verify digital receipt generation

2. **UI/UX Validation:**
   - Test responsive design on different screen sizes
   - Verify Albert Heijn color scheme compliance
   - Test touch interactions for tablet/phone interface
   - Validate "lees van scanner" random receipt feature

3. **HTTP Testing:**
   ```bash
   curl -I http://localhost:8000/
   ```
   - Should return 200 OK status
   - Takes < 1 second

#### Automated UI Testing (Available)
The environment includes Playwright browser automation for UI validation:

```bash
# Browser automation is available via playwright tools
# Test key functionality automatically:
playwright-browser_navigate http://localhost:8000/
playwright-browser_click "Start Scannen button"
playwright-browser_take_screenshot
```

- **UI automation test time:** 30-60 seconds per scenario
- **Screenshot generation:** ~2-3 seconds
- **Responsive design testing:** Test both desktop (1280x720) and mobile (375x667) viewports

### Linting and Code Quality
When implementing linting (recommended for production code):

```bash
npm install -g eslint      # JavaScript linting
npm install -g prettier    # Code formatting
```

- **Always run linting before committing:**
  ```bash
  npm run lint    # If configured in package.json
  ```
- **Always run formatting:**
  ```bash
  npm run format  # If configured in package.json
  ```

### Git Workflow
- **Check status frequently:** `git --no-pager status`
- **View changes:** `git --no-pager diff`
- **Add files:** `git add .`
- **Commit changes:** `git commit -m "descriptive message"`
- **Push changes:** Use report_progress tool (not direct git push)

### Expected Timing and Timeout Guidelines
- **Repository clone:** < 5 seconds
- **npm init:** < 1 second (measured: ~0.1 seconds)
- **npm install (basic packages):** 2-15 seconds (measured: express install ~4 seconds)
- **Web server startup:** < 1 second (measured: immediate)
- **HTTP server startup:** < 1 second (measured: immediate)
- **Manual validation scenarios:** 5-10 minutes per complete workflow
- **UI validation with browser automation:** 30-60 seconds per scenario
- **NEVER CANCEL** any running development servers during testing

### Validation Scenarios

#### Required End-to-End Testing
Before considering any implementation complete, ALWAYS test these scenarios:

1. **Basic Scanner Simulation:**
   - Start web application
   - Navigate to main scanner interface
   - Input test product codes
   - Verify cart updates correctly
   - Complete checkout process
   - **Time expectation:** 3-5 minutes per test

2. **Random Receipt Feature:**
   - Access "lees van scanner" functionality
   - Generate random digital receipt
   - Verify products and pricing display correctly
   - **Time expectation:** 1-2 minutes per test

3. **Responsive Design:**
   - Test on simulated tablet viewport (768px+)
   - Test on simulated phone viewport (320px-768px)
   - Verify touch-friendly interface
   - **Time expectation:** 2-3 minutes per test

### Key Project Files and Locations

#### Current Repository Structure
```
seflscanfun/
├── .git/           # Git repository metadata
├── .github/        # GitHub configuration
│   └── copilot-instructions.md  # This file
├── .gitignore      # Git ignore rules (excludes node_modules, etc.)
├── README.md       # Basic project description  
├── index.html      # Albert Heijn scanner demo/prototype
├── package.json    # Node.js project configuration
├── package-lock.json # Dependency lock file
└── node_modules/   # Node.js dependencies (excluded from git)
```

#### Expected Future Structure (Albert Heijn Simulator)
```
seflscanfun/
├── index.html      # Main application entry point
├── css/
│   ├── ah-theme.css     # Albert Heijn color scheme
│   └── responsive.css   # Mobile/tablet styles
├── js/
│   ├── scanner.js       # Barcode scanning simulation
│   ├── cart.js         # Shopping cart management
│   ├── checkout.js     # Payment simulation
│   └── receipt.js      # Digital receipt generation
├── assets/
│   ├── products.json   # Product database
│   └── logos/         # Albert Heijn branding
├── package.json        # Node.js dependencies
└── README.md          # Updated project documentation
```

### Albert Heijn Specific Requirements
Based on issue #2, the application must include:

- **Color Scheme:** Use Albert Heijn's official blue (#003082) and white branding
- **Product Database:** Include realistic Dutch grocery products
- **Language:** Interface should support Dutch language
- **Mobile-First:** Responsive design prioritizing mobile/tablet experience
- **Receipt Format:** Match Albert Heijn's actual receipt layout
- **Scanner Simulation:** Realistic barcode scanning workflow

### Common Tasks Reference

#### Starting Fresh Development Session
```bash
cd seflscanfun
git --no-pager status
git --no-pager pull  # If needed
python3 -m http.server 8000 &  # Start development server
curl http://localhost:8000/     # Validate server
```

#### Quick Repository Check
```bash
ls -la   # Show all files
git --no-pager log --oneline -5  # Recent commits
git --no-pager branch    # Current branch
```

### Troubleshooting

#### Common Issues and Solutions
1. **Server won't start:**
   - Check if port 8000 is already in use: `lsof -i :8000`
   - Use alternative port: `python3 -m http.server 8080`

2. **Git operations fail:**
   - Use report_progress tool for commits and pushes
   - Never use direct `git push` commands

3. **Dependencies fail to install:**
   - Check Node.js version: `node --version`
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### GitHub Pages Deployment (Future)
When ready for deployment:
- Repository supports GitHub Pages hosting
- Main application should be in repository root or docs/ folder
- Use `index.html` as entry point for automatic GitHub Pages detection

### Security Considerations
- This is a simulation project - do not implement real payment processing
- Include clear disclaimers that this is educational/fun simulation only
- Avoid storing any real personal or payment information
- Use placeholder data for all transactions

### Performance Expectations
- **Initial page load:** < 2 seconds
- **Product search/scan:** < 500ms response time
- **Cart operations:** Immediate UI updates
- **Receipt generation:** < 1 second

Always prioritize user experience and ensure the simulation feels realistic while maintaining security and performance standards.