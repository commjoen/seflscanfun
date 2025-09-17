// Albert Heijn Self-Scanner Application
class SelfScannerApp {
    constructor() {
        this.cart = [];
        this.currentProduct = null;
        this.cameraStream = null;
        this.deferredPrompt = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateCartDisplay();
        this.initProductCatalog();
        this.focusBarcodeInput();
        this.initPWAInstall();
    }

    initPWAInstall() {
        const installBtn = document.getElementById('installBtn');
        
        if (!installBtn) {
            console.log('Install button not found');
            return;
        }
        
        // Listen for the beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Store the event so it can be triggered later
            this.deferredPrompt = e;
            // Show the install button
            installBtn.style.display = 'flex';
        });

        // Handle install button click
        installBtn.addEventListener('click', async () => {
            if (!this.deferredPrompt) return;
            
            // Show the install prompt
            this.deferredPrompt.prompt();
            
            // Wait for the user to respond
            const { outcome } = await this.deferredPrompt.userChoice;
            
            if (outcome === 'accepted') {
                console.log('User accepted the install prompt');
                this.showMessage('App wordt geïnstalleerd...', 'success');
            } else {
                console.log('User dismissed the install prompt');
            }
            
            // Reset the deferred prompt
            this.deferredPrompt = null;
            installBtn.style.display = 'none';
        });

        // Listen for app installed event
        window.addEventListener('appinstalled', () => {
            console.log('App was successfully installed');
            this.showMessage('App succesvol geïnstalleerd!', 'success');
            installBtn.style.display = 'none';
            this.deferredPrompt = null;
        });

        // Hide install button if app is already installed (running in standalone mode)
        if (window.matchMedia('(display-mode: standalone)').matches) {
            installBtn.style.display = 'none';
        }
    }

    bindEvents() {
        // Barcode scanning
        document.getElementById('barcodeInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                window.soundManager?.playClickSound('scan');
                this.scanProduct();
            }
        });

        document.getElementById('scanButton').addEventListener('click', () => {
            window.soundManager?.playClickSound('button');
            this.scanProduct();
        });

        // Camera scanning
        document.getElementById('cameraButton').addEventListener('click', () => {
            window.soundManager?.playClickSound('button');
            this.openCameraScanner();
        });

        // Random receipt feature
        document.getElementById('randomReceiptBtn').addEventListener('click', () => {
            window.soundManager?.playClickSound('button');
            this.generateRandomReceipt();
        });

        // Product actions
        document.getElementById('addToCartBtn').addEventListener('click', () => {
            window.soundManager?.playClickSound('success');
            this.addCurrentProductToCart();
        });

        document.getElementById('skipProductBtn').addEventListener('click', () => {
            window.soundManager?.playClickSound('button');
            this.skipCurrentProduct();
        });

        // Checkout
        document.getElementById('checkoutBtn').addEventListener('click', () => {
            window.soundManager?.playClickSound('button');
            this.startCheckout();
        });

        // Modal controls
        document.getElementById('closeReceipt').addEventListener('click', () => {
            window.soundManager?.playClickSound('button');
            this.closeModal('receiptModal');
        });

        document.getElementById('closePayment').addEventListener('click', () => {
            window.soundManager?.playClickSound('button');
            this.closeModal('paymentModal');
        });

        document.getElementById('printReceiptBtn').addEventListener('click', () => {
            window.soundManager?.playClickSound('button');
            this.printReceipt();
        });

        document.getElementById('newShoppingBtn').addEventListener('click', () => {
            window.soundManager?.playClickSound('success');
            this.startNewShopping();
        });

        // Payment methods
        document.querySelectorAll('.payment-method').forEach(button => {
            button.addEventListener('click', (e) => {
                window.soundManager?.playClickSound('payment');
                const method = e.currentTarget.dataset.method;
                this.processPayment(method);
            });
        });

        // Camera scanner controls
        document.getElementById('closeCamera').addEventListener('click', () => {
            window.soundManager?.playClickSound('button');
            this.closeCameraScanner();
        });

        document.getElementById('startCamera').addEventListener('click', () => {
            window.soundManager?.playClickSound('button');
            this.startCamera();
        });

        document.getElementById('stopCamera').addEventListener('click', () => {
            window.soundManager?.playClickSound('button');
            this.stopCamera();
        });

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target.id);
            }
        });

        // Sound toggle
        document.getElementById('soundToggle').addEventListener('click', () => {
            this.toggleSound();
        });

        // Product catalog search and filter
        document.getElementById('productSearch').addEventListener('input', () => {
            this.filterProducts();
        });

        document.getElementById('categoryFilter').addEventListener('change', () => {
            this.filterProducts();
        });

        // Payment modal events
        document.querySelectorAll('.payment-method').forEach(btn => {
            btn.addEventListener('click', (e) => {
                window.soundManager?.playClickSound('button');
                const method = e.currentTarget.dataset.method;
                this.processPayment(method);
            });
        });

        // Modal close events
        document.getElementById('closePayment').addEventListener('click', () => {
            this.closeModal('paymentModal');
        });

        document.getElementById('closeReceipt').addEventListener('click', () => {
            this.closeModal('receiptModal');
        });

        // Receipt actions
        document.getElementById('printReceiptBtn').addEventListener('click', () => {
            this.printReceipt();
        });

        document.getElementById('newShoppingBtn').addEventListener('click', () => {
            this.startNewShopping();
        });
    }

    focusBarcodeInput() {
        document.getElementById('barcodeInput').focus();
    }

    scanProduct() {
        const barcodeInput = document.getElementById('barcodeInput');
        const barcode = barcodeInput.value.trim();

        if (!barcode) {
            this.showMessage('Voer een barcode in', 'warning');
            return;
        }

        // Add loading state
        const scanButton = document.getElementById('scanButton');
        scanButton.classList.add('loading');
        scanButton.disabled = true;

        // Simulate scanning delay
        setTimeout(() => {
            const product = findProductByBarcode(barcode);
            
            if (product) {
                window.soundManager?.playClickSound('success');
                this.displayProduct(barcode, product);
                this.showMessage(`Product gevonden: ${product.name}`, 'success');
            } else {
                window.soundManager?.playClickSound('error');
                this.showMessage('Product niet gevonden. Probeer een andere barcode.', 'error');
                this.hideProductDisplay();
            }

            // Remove loading state
            scanButton.classList.remove('loading');
            scanButton.disabled = false;
            barcodeInput.value = '';
        }, 800);
    }

    displayProduct(barcode, product) {
        this.currentProduct = { barcode, ...product };
        
        const productDisplay = document.getElementById('productDisplay');
        const productImage = document.getElementById('productImage');
        const productName = document.getElementById('productName');
        const productDescription = document.getElementById('productDescription');
        const productPrice = document.getElementById('productPrice');

        // Use emoji as image placeholder
        productImage.style.display = 'none';
        productImage.nextElementSibling?.remove(); // Remove any existing emoji
        
        const emojiSpan = document.createElement('span');
        emojiSpan.style.fontSize = '60px';
        emojiSpan.style.display = 'block';
        emojiSpan.style.textAlign = 'center';
        emojiSpan.style.marginBottom = '10px';
        emojiSpan.textContent = product.image;
        productImage.parentNode.insertBefore(emojiSpan, productImage.nextSibling);

        productName.textContent = product.name;
        productDescription.textContent = product.description;
        productPrice.textContent = this.formatPrice(product.price);

        productDisplay.style.display = 'block';
        productDisplay.scrollIntoView({ behavior: 'smooth' });
    }

    hideProductDisplay() {
        const productDisplay = document.getElementById('productDisplay');
        productDisplay.style.display = 'none';
        this.currentProduct = null;
    }

    addCurrentProductToCart() {
        if (!this.currentProduct) return;

        const existingItem = this.cart.find(item => item.barcode === this.currentProduct.barcode);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...this.currentProduct,
                quantity: 1
            });
        }

        this.updateCartDisplay();
        this.hideProductDisplay();
        this.showMessage(`${this.currentProduct.name} toegevoegd aan winkelwagen`, 'success');
        this.focusBarcodeInput();
    }

    skipCurrentProduct() {
        this.hideProductDisplay();
        this.showMessage('Product overgeslagen', 'info');
        this.focusBarcodeInput();
    }

    removeFromCart(barcode) {
        this.cart = this.cart.filter(item => item.barcode !== barcode);
        this.updateCartDisplay();
        this.showMessage('Product verwijderd uit winkelwagen', 'info');
    }

    updateQuantity(barcode, change) {
        const item = this.cart.find(item => item.barcode === barcode);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(barcode);
            } else {
                this.updateCartDisplay();
            }
        }
    }

    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartCount = document.getElementById('cartCount');
        const cartTotal = document.getElementById('cartTotal');
        const subtotal = document.getElementById('subtotal');
        const finalTotal = document.getElementById('finalTotal');
        const checkoutBtn = document.getElementById('checkoutBtn');

        // Calculate totals
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Update header
        cartCount.textContent = `${totalItems} ${totalItems === 1 ? 'product' : 'producten'}`;
        cartTotal.textContent = this.formatPrice(totalPrice);

        // Update cart items
        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Uw winkelwagen is leeg</p>';
            checkoutBtn.disabled = true;
        } else {
            cartItems.innerHTML = this.cart.map(item => this.renderCartItem(item)).join('');
            checkoutBtn.disabled = false;
        }

        // Update totals
        subtotal.textContent = this.formatPrice(totalPrice);
        finalTotal.textContent = this.formatPrice(totalPrice);

        // Bind cart item events
        this.bindCartItemEvents();
    }

    renderCartItem(item) {
        const totalPrice = item.price * item.quantity;
        
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-description">${item.description}</div>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" data-barcode="${item.barcode}" data-change="-1">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" data-barcode="${item.barcode}" data-change="1">+</button>
                    </div>
                    <div class="cart-item-price">${this.formatPrice(totalPrice)}</div>
                    <button class="remove-btn" data-barcode="${item.barcode}">×</button>
                </div>
            </div>
        `;
    }

    bindCartItemEvents() {
        // Quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                window.soundManager?.playClickSound('button');
                const barcode = e.target.dataset.barcode;
                const change = parseInt(e.target.dataset.change);
                this.updateQuantity(barcode, change);
            });
        });

        // Remove buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                window.soundManager?.playClickSound('button');
                const barcode = e.target.dataset.barcode;
                this.removeFromCart(barcode);
            });
        });
    }

    startCheckout() {
        if (this.cart.length === 0) return;

        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('paymentAmount').textContent = this.formatPrice(totalPrice);
        this.showModal('paymentModal');
    }

    processPayment(method) {
        this.closeModal('paymentModal');
        
        // Simulate payment processing
        this.showMessage('Betaling wordt verwerkt...', 'info');
        
        setTimeout(() => {
            this.showMessage(`Betaling succesvol via ${this.getPaymentMethodName(method)}!`, 'success');
            this.generateReceipt();
        }, 2000);
    }

    getPaymentMethodName(method) {
        const methods = {
            'pin': 'PIN',
            'contactless': 'Contactloos',
            'cash': 'Contant'
        };
        return methods[method] || method;
    }

    generateReceipt() {
        const receipt = document.getElementById('receipt');
        const now = new Date();
        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        receipt.innerHTML = `
            <div class="receipt-header">
                <div class="receipt-store">Albert Heijn</div>
                <div class="receipt-address">Zelfscanner Simulatie</div>
                <div class="receipt-date">${this.formatDateTime(now)}</div>
            </div>
            
            <div class="receipt-items">
                ${this.cart.map(item => `
                    <div class="receipt-item">
                        <span>${item.name} (${item.quantity}x)</span>
                        <span>${this.formatPrice(item.price * item.quantity)}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="receipt-totals">
                <div class="receipt-total-line">
                    <span>Subtotaal:</span>
                    <span>${this.formatPrice(totalPrice)}</span>
                </div>
                <div class="receipt-total-line">
                    <span>BTW (21%):</span>
                    <span>${this.formatPrice(totalPrice * 0.21)}</span>
                </div>
                <div class="receipt-total-line receipt-final-total">
                    <span>TOTAAL:</span>
                    <span>${this.formatPrice(totalPrice)}</span>
                </div>
            </div>
            
            <div class="receipt-footer">
                <p>Bedankt voor uw bezoek!</p>
                <p>Albert Heijn - Hier vind je alles</p>
                <p>Bon #${Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
        `;

        this.showModal('receiptModal');
    }

    generateRandomReceipt() {
        const randomProducts = getRandomProducts();
        this.cart = randomProducts;
        this.updateCartDisplay();
        this.showMessage('Willekeurige bon geladen!', 'success');
        
        // Automatically generate receipt
        setTimeout(() => {
            this.generateReceipt();
        }, 1000);
    }

    printReceipt() {
        window.print();
    }

    startNewShopping() {
        this.cart = [];
        this.currentProduct = null;
        this.updateCartDisplay();
        this.hideProductDisplay();
        this.closeModal('receiptModal');
        this.showMessage('Nieuwe boodschappenlijst gestart', 'success');
        this.focusBarcodeInput();
    }

    showModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    showMessage(message, type = 'info') {
        // Create or update message element
        let messageEl = document.getElementById('message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.id = 'message';
            messageEl.style.cssText = `
                position: fixed;
                top: 80px;
                left: 50%;
                transform: translateX(-50%);
                padding: 1rem 2rem;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 1001;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                transition: all 0.3s ease;
            `;
            document.body.appendChild(messageEl);
        }

        // Set message and style based on type
        messageEl.textContent = message;
        const colors = {
            success: '#00AA44',
            error: '#FF3333',
            warning: '#FF6600',
            info: '#0066CC'
        };
        messageEl.style.backgroundColor = colors[type] || colors.info;
        messageEl.style.display = 'block';

        // Auto-hide after 3 seconds
        setTimeout(() => {
            if (messageEl.style.display !== 'none') {
                messageEl.style.display = 'none';
            }
        }, 3000);
    }

    // Camera Scanner Methods
    openCameraScanner() {
        // Check if camera is supported
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            this.showMessage('Camera wordt niet ondersteund op dit apparaat', 'error');
            return;
        }

        this.showModal('cameraModal');
        this.updateCameraStatus('Klik "Start Camera" om te beginnen met scannen');
    }

    closeCameraScanner() {
        this.stopCamera();
        this.closeModal('cameraModal');
    }

    async startCamera() {
        try {
            const startBtn = document.getElementById('startCamera');
            const stopBtn = document.getElementById('stopCamera');
            const video = document.getElementById('cameraVideo');
            
            startBtn.disabled = true;
            this.updateCameraStatus('Camera wordt gestart...');
            
            // Request camera access
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment', // Use rear camera if available
                    width: { ideal: 640 },
                    height: { ideal: 480 }
                }
            });
            
            video.srcObject = stream;
            this.cameraStream = stream;
            
            // Start barcode scanning
            this.initializeQuagga();
            
            startBtn.style.display = 'none';
            stopBtn.style.display = 'block';
            this.updateCameraStatus('Richt uw camera op een barcode...');
            
        } catch (error) {
            console.error('Camera error:', error);
            this.updateCameraStatus('Kan camera niet starten. Controleer toestemmingen.');
            document.getElementById('startCamera').disabled = false;
            
            let errorMessage = 'Kan camera niet toegang krijgen';
            if (error.name === 'NotAllowedError') {
                errorMessage = 'Camera toegang geweigerd. Sta camera toe in browserinstellingen.';
            } else if (error.name === 'NotFoundError') {
                errorMessage = 'Geen camera gevonden op dit apparaat.';
            }
            this.showMessage(errorMessage, 'error');
        }
    }

    stopCamera() {
        if (this.cameraStream) {
            this.cameraStream.getTracks().forEach(track => track.stop());
            this.cameraStream = null;
        }
        
        if (typeof Quagga !== 'undefined') {
            Quagga.stop();
        }
        
        const startBtn = document.getElementById('startCamera');
        const stopBtn = document.getElementById('stopCamera');
        const video = document.getElementById('cameraVideo');
        
        video.srcObject = null;
        startBtn.style.display = 'block';
        startBtn.disabled = false;
        stopBtn.style.display = 'none';
        
        this.updateCameraStatus('Camera gestopt');
    }

    initializeQuagga() {
        const video = document.getElementById('cameraVideo');
        
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: video,
                constraints: {
                    width: 640,
                    height: 480,
                    facingMode: "environment"
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: 2,
            decoder: {
                readers: [
                    "code_128_reader",
                    "ean_reader",
                    "ean_8_reader", 
                    "code_39_reader"
                ]
            },
            locate: true
        }, (err) => {
            if (err) {
                console.error('Quagga initialization error:', err);
                this.updateCameraStatus('Barcode scanner kon niet starten');
                return;
            }
            
            // Start scanning
            Quagga.start();
            
            // Listen for detected barcodes
            Quagga.onDetected(this.onBarcodeDetected.bind(this));
        });
    }

    onBarcodeDetected(result) {
        const barcode = result.codeResult.code;
        
        // Validate barcode (basic check)
        if (barcode && barcode.length >= 8) {
            window.soundManager?.playClickSound('success');
            this.updateCameraStatus(`Barcode gevonden: ${barcode}`);
            
            // Close camera and process the barcode
            this.stopCamera();
            this.closeModal('cameraModal');
            
            // Process the scanned barcode
            this.processBarcodeFromCamera(barcode);
        }
    }

    processBarcodeFromCamera(barcode) {
        // Use the existing product lookup logic
        const product = findProductByBarcode(barcode);
        
        if (product) {
            this.displayProduct(barcode, product);
            this.showMessage(`Product gevonden via camera: ${product.name}`, 'success');
        } else {
            this.showMessage(`Product met barcode ${barcode} niet gevonden`, 'error');
            // Still fill the input so user can see what was scanned
            document.getElementById('barcodeInput').value = barcode;
        }
    }

    updateCameraStatus(message) {
        const statusEl = document.getElementById('cameraStatus');
        if (statusEl) {
            statusEl.innerHTML = `<p>${message}</p>`;
        }
    }

    formatPrice(price) {
        return `€${price.toFixed(2).replace('.', ',')}`;
    }

    toggleSound() {
        const isEnabled = window.soundManager?.toggle();
        const soundToggle = document.getElementById('soundToggle');
        const soundIcon = soundToggle.querySelector('.sound-icon');
        
        if (isEnabled) {
            soundToggle.classList.remove('disabled');
            soundIcon.textContent = '🔊';
            soundToggle.title = 'Geluid uitschakelen';
            window.soundManager?.playClickSound('button');
        } else {
            soundToggle.classList.add('disabled');
            soundIcon.textContent = '🔇';
            soundToggle.title = 'Geluid inschakelen';
        }
    }

    formatDateTime(date) {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        return date.toLocaleDateString('nl-NL', options).replace(',', '');
    }

    // Product Catalog Methods
    initProductCatalog() {
        this.populateCategoryFilter();
        this.renderProductCatalog();
    }

    populateCategoryFilter() {
        const categoryFilter = document.getElementById('categoryFilter');
        const categories = getAllCategories();
        
        // Clear existing options except "Alle categorieën"
        while (categoryFilter.children.length > 1) {
            categoryFilter.removeChild(categoryFilter.lastChild);
        }
        
        // Add category options
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    renderProductCatalog(filteredProducts = null) {
        const productGrid = document.getElementById('productGrid');
        const productsToShow = filteredProducts || this.getAllProductsArray();
        
        productGrid.innerHTML = productsToShow.map(product => this.renderProductCard(product)).join('');
        
        // Bind click events to product cards
        this.bindProductCardEvents();
    }

    getAllProductsArray() {
        return Object.entries(PRODUCTS_DATABASE).map(([barcode, product]) => ({
            barcode,
            ...product
        }));
    }

    renderProductCard(product) {
        return `
            <div class="product-card" data-barcode="${product.barcode}">
                <span class="product-card-image">${product.image}</span>
                <div class="product-card-name">${product.name}</div>
                <div class="product-card-description">${product.description}</div>
                <div class="product-card-price">${this.formatPrice(product.price)}</div>
                <div class="product-card-category">${product.category}</div>
            </div>
        `;
    }

    bindProductCardEvents() {
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                window.soundManager?.playClickSound('button');
                const barcode = e.currentTarget.dataset.barcode;
                this.addProductToCartByBarcode(barcode);
            });
        });
    }

    addProductToCartByBarcode(barcode) {
        const product = findProductByBarcode(barcode);
        if (!product) return;

        const existingItem = this.cart.find(item => item.barcode === barcode);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                barcode,
                ...product,
                quantity: 1
            });
        }

        this.updateCartDisplay();
        this.showMessage(`${product.name} toegevoegd aan winkelwagen`, 'success');
    }

    filterProducts() {
        const searchTerm = document.getElementById('productSearch').value.toLowerCase();
        const selectedCategory = document.getElementById('categoryFilter').value;
        
        let filteredProducts = this.getAllProductsArray();
        
        // Filter by search term
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
        }
        
        // Filter by category
        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(product =>
                product.category === selectedCategory
            );
        }
        
        this.renderProductCatalog(filteredProducts);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SelfScannerApp();
});

// Service Worker registration for offline capability
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}