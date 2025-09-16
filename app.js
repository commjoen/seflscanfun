// Albert Heijn Self-Scanner Application
class SelfScannerApp {
    constructor() {
        this.cart = [];
        this.currentProduct = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateCartDisplay();
        this.focusBarcodeInput();
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
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SelfScannerApp();
});

// Service Worker registration for offline capability (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}