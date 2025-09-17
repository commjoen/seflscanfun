// Version management for Albert Heijn Self-Scanner
// This version will be automatically updated by release workflows

const APP_VERSION = {
    version: "1.0.0",
    buildDate: "2025-09-17",
    gitCommit: "",
    environment: "development"
};

// Function to display version in the footer
function displayVersionInfo() {
    const footer = document.querySelector('.app-footer');
    if (footer) {
        const versionText = `v${APP_VERSION.version} (${APP_VERSION.buildDate})`;
        const versionElement = footer.querySelector('.version-info');
        if (versionElement) {
            versionElement.textContent = versionText;
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APP_VERSION;
}

// Auto-display version when DOM is loaded
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', displayVersionInfo);
}