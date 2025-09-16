# Albert Heijn Self-Scanner Fun Simulation

Albert Heijn Self-Scanner Fun (seflscanfun) is a web application project that simulates an Albert Heijn self-scanner system. The project is a complete, interactive Albert Heijn self-scanner simulation including barcode scanning, digital receipts, shopping cart management, checkout simulation, and responsive UI for tablet/phone interfaces.

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

### Complete Application Structure
The repository contains a fully functional Albert Heijn self-scanner simulation:

```
seflscanfun/
├── .git/           # Git repository metadata
├── .github/        # GitHub configuration
│   └── copilot-instructions.md  # This file
├── .gitignore      # Git ignore rules (excludes node_modules, etc.)
├── README.md       # Complete project documentation  
├── index.html      # Main application entry point
├── app.js          # Core application logic (15KB+)
├── styles.css      # Albert Heijn styling and responsive design (12KB+)
├── products.js     # Product database with realistic Dutch products
├── sw.js           # Service Worker for offline functionality
├── test.html       # Test suite for application validation
├── package.json    # Node.js project configuration
└── package-lock.json # Dependency lock file
```

### Building and Running

#### Development Server (Primary Method)
The application is a complete static web application that can be served directly:

1. **Start development server:**
   ```bash
   python3 -m http.server 8000
   ```
   - Starts immediately (< 1 second)
   - Serves files on http://localhost:8000
   - **NEVER CANCEL** - Keep server running during development
   - Alternative: `live-server` for auto-reload functionality

2. **Validation:**
   ```bash
   curl -s http://localhost:8000/ | head -5
   ```
   - Should return HTML content immediately
   - Validates server is working correctly

#### Advanced Development Setup
For enhanced development with dependencies:
1. **Install and setup:**
   ```bash
   npm install
   ```
   - Dependencies already defined in package.json
   - Takes ~2-5 seconds to install

2. **Start advanced server (if needed):**
   ```bash
   node app.js  # If implementing server-side features
   ```
   - Starts immediately (< 1 second)
   - **NEVER CANCEL** - Keep server running during development

### Testing and Validation

#### Manual Validation Requirements
**CRITICAL**: After any changes to the web application, ALWAYS manually validate through complete user scenarios:

1. **Core Self-Scanner Workflow:**
   - Navigate to http://localhost:8000/
   - Test scanning products (enter barcode "8717163016078" for AH Melk)
   - Verify products appear in shopping cart with correct pricing
   - Test cart quantity modifications using +/- buttons
   - Proceed through checkout process and payment simulation
   - Verify digital receipt generation and display

2. **Advanced Features Testing:**
   - Test "Lees van Scanner" random receipt functionality
   - Verify offline functionality using Service Worker
   - Test product search and filtering
   - Validate payment method selection and processing
   - Test receipt email/print simulation

3. **UI/UX Validation:**
   - Test responsive design on different screen sizes  
   - Verify Albert Heijn color scheme compliance (#003082 blue)
   - Test touch interactions for tablet/phone interface
   - Validate accessibility features and keyboard navigation

4. **HTTP Testing:**
   ```bash
   curl -I http://localhost:8000/
   ```
   - Should return 200 OK status
   - Takes < 1 second

#### Automated Testing (Available)
- **Test suite available in test.html**
- Run tests by opening: http://localhost:8000/test.html
- Expected test duration: ~5-10 seconds for unit tests
- **NEVER CANCEL** tests - Always wait for completion
- All core functionality is covered by automated tests

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
   - Start web application on http://localhost:8000/
   - Navigate to main scanner interface  
   - Input test product codes (8717163016078, 8712100723612, etc.)
   - Verify cart updates correctly with product details and pricing
   - Complete checkout process with payment simulation
   - **Time expectation:** 3-5 minutes per test

2. **Random Receipt Feature:**
   - Access "Lees van Scanner" functionality
   - Generate random digital receipt
   - Verify realistic products and pricing display correctly
   - Test receipt download/email simulation
   - **Time expectation:** 1-2 minutes per test

3. **Responsive Design:**
   - Test on simulated tablet viewport (768px+)
   - Test on simulated phone viewport (320px-768px)
   - Verify touch-friendly interface and mobile navigation
   - **Time expectation:** 2-3 minutes per test

4. **Service Worker Offline Testing:**
   - Load application online, then disconnect network
   - Verify application continues to function offline
   - Test cached product data and functionality
   - **Time expectation:** 2-3 minutes per test

### Key Project Files and Locations

#### Current Repository Structure
```
seflscanfun/
├── .git/           # Git repository metadata
├── .github/        # GitHub configuration
│   └── copilot-instructions.md  # This file
├── .gitignore      # Git ignore rules (excludes node_modules, etc.)
├── README.md       # Complete project documentation (6KB+)
├── index.html      # Main application entry point (5KB+)
├── app.js          # Core application logic with scanner simulation (15KB+) 
├── styles.css      # Albert Heijn styling and responsive design (12KB+)
├── products.js     # Product database with realistic Dutch products (6KB+)
├── sw.js           # Service Worker for offline functionality
├── test.html       # Test suite for application validation (8KB+)
├── package.json    # Node.js project configuration
└── package-lock.json # Dependency lock file
```

#### Key Application Files
- **index.html**: Complete Albert Heijn self-scanner interface
- **app.js**: SelfScannerApp class with full shopping cart and payment logic
- **styles.css**: Albert Heijn color scheme (#003082) with responsive design
- **products.js**: Realistic Dutch grocery product database (70+ products)
- **test.html**: Comprehensive test suite for all application functionality
- **sw.js**: Service Worker for PWA offline functionality

#### Expected Future Structure (Completed)
The application is now complete with all planned features implemented:

- **✅ Barcode scanning simulation** - Fully functional with product lookup
- **✅ Digital receipts** - Complete receipt generation and display
- **✅ Shopping cart management** - Add/remove/modify quantities
- **✅ Checkout simulation** - Multiple payment methods supported
- **✅ "Lees van scanner" feature** - Random receipt generation
- **✅ Responsive design** - Mobile-first approach with tablet/phone support
- **✅ Albert Heijn branding** - Authentic color scheme and styling
- **✅ Offline functionality** - Service Worker for PWA capabilities
- **✅ Test suite** - Comprehensive automated testing

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