
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Animate toggle button
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', function() {
                    item.classList.toggle('active');
                });
            }
        });
    }
    
    // FAQ category functionality
    const categoryButtons = document.querySelectorAll('.faq-category-btn');
    const categories = document.querySelectorAll('.faq-category');
    
    if (categoryButtons && categories) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Remove active class from all buttons and categories
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                categories.forEach(cat => cat.classList.remove('active'));
                
                // Add active class to clicked button and corresponding category
                this.classList.add('active');
                document.getElementById(category)?.classList.add('active');
            });
        });
    }
    
    // Product filters
    const filterButton = document.getElementById('filter-button');
    const resetButton = document.getElementById('reset-button');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterButton && resetButton && productCards.length > 0) {
        filterButton.addEventListener('click', function() {
            const category = document.getElementById('category-filter').value;
            const plasticType = document.getElementById('plastic-type-filter').value;
            const price = document.getElementById('price-filter').value;
            
            productCards.forEach(card => {
                let showCard = true;
                
                if (category !== 'all' && card.getAttribute('data-category') !== category) {
                    showCard = false;
                }
                
                if (plasticType !== 'all' && card.getAttribute('data-type') !== plasticType) {
                    showCard = false;
                }
                
                if (price !== 'all' && card.getAttribute('data-price') !== price) {
                    showCard = false;
                }
                
                card.style.display = showCard ? 'block' : 'none';
            });
        });
        
        resetButton.addEventListener('click', function() {
            document.getElementById('category-filter').value = 'all';
            document.getElementById('plastic-type-filter').value = 'all';
            document.getElementById('price-filter').value = 'all';
            
            productCards.forEach(card => {
                card.style.display = 'block';
            });
        });
    }

    // Cart functionality
    const cartIcon = document.querySelector('.cart-icon');
    const cartDialog = document.getElementById('cartDialog');
    const cartCloseButton = cartDialog?.querySelector('.close-button');
    const cartItems = document.getElementById('cart-items');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartCountDisplay = document.querySelector('.cart-count');

    // Cart data
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartDisplay();

    // Open cart dialog
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            if (cartDialog) cartDialog.style.display = 'block';
        });
    }

    // Close cart dialog
    if (cartCloseButton) {
        cartCloseButton.addEventListener('click', function() {
            if (cartDialog) cartDialog.style.display = 'none';
        });
    }

    // Close dialog when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cartDialog) {
            cartDialog.style.display = 'none';
        }
    });

    // Update cart display
    function updateCartDisplay() {
        // Skip if elements don't exist (happens in React app)
        if (!cartItems || !cartTotalAmount || !checkoutBtn) return;

        // Update cart count
        if (cartCountDisplay) {
            cartCountDisplay.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        }

        // Update cart items display
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
            cartTotalAmount.textContent = 'UGX 0.00';
            checkoutBtn.disabled = true;
        } else {
            let itemsHTML = '';
            let total = 0;

            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                itemsHTML += `
                <div class="cart-item">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">UGX ${item.price.toFixed(2)} each</div>
                    </div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn minus" data-index="${index}">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn plus" data-index="${index}">+</button>
                        </div>
                        <button class="remove-btn" data-index="${index}">×</button>
                    </div>
                </div>
                `;
            });

            cartItems.innerHTML = itemsHTML;
            cartTotalAmount.textContent = `UGX ${total.toFixed(2)}`;
            checkoutBtn.disabled = false;

            // Add event listeners to quantity buttons and remove buttons
            document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    if (cart[index].quantity > 1) {
                        cart[index].quantity--;
                        saveCart();
                        updateCartDisplay();
                    }
                });
            });

            document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    cart[index].quantity++;
                    saveCart();
                    updateCartDisplay();
                });
            });

            document.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    cart.splice(index, 1);
                    saveCart();
                    updateCartDisplay();
                });
            });
        }
    }

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Global function to add items to cart (for use in product pages)
    window.addToCart = function(id, name, price) {
        // Check if the item is already in the cart
        const existingItemIndex = cart.findIndex(item => item.id === id);
        
        if (existingItemIndex >= 0) {
            // Update quantity if item exists
            cart[existingItemIndex].quantity += 1;
        } else {
            // Add new item if it doesn't exist
            cart.push({
                id: id,
                name: name,
                price: price,
                quantity: 1
            });
        }
        
        saveCart();
        updateCartDisplay();
        
        // Show cart after adding an item
        if (cartDialog) {
            cartDialog.style.display = 'block';
        }
    };

    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length > 0) {
                // Display checkout message
                alert('Proceeding to checkout with ' + cart.length + ' items worth UGX' + 
                    cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2));
                
                // Clear cart after checkout
                cart = [];
                saveCart();
                updateCartDisplay();
                
                // Close cart dialog
                if (cartDialog) cartDialog.style.display = 'none';
            }
        });
    }
    
    // Mobile Money Dialog functionality
    const mobileMoneyBtn = document.getElementById('mobileMoneyBtn');
    const mobileMoneyDialog = document.getElementById('mobileMoneyDialog');
    const mobileMoneyCloseButton = mobileMoneyDialog?.querySelector('.close-button');
    const mobileMoneyForm = document.getElementById('mobileMoneyForm');
    const cancelButton = mobileMoneyDialog?.querySelector('.cancel-button');
    const paymentAmountInput = document.getElementById('paymentAmount');
    
    // Open mobile money dialog
    if (mobileMoneyBtn && mobileMoneyDialog) {
        mobileMoneyBtn.addEventListener('click', function() {
            // Set payment amount based on cart total if it's a cart payment
            if (paymentAmountInput) {
                const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                paymentAmountInput.value = cartTotal.toFixed(2);
            }
            
            mobileMoneyDialog.style.display = 'block';
        });
    }
    
    // Close mobile money dialog
    if (mobileMoneyCloseButton && mobileMoneyDialog) {
        mobileMoneyCloseButton.addEventListener('click', function() {
            mobileMoneyDialog.style.display = 'none';
        });
    }
    
    // Cancel button
    if (cancelButton && mobileMoneyDialog) {
        cancelButton.addEventListener('click', function() {
            mobileMoneyDialog.style.display = 'none';
        });
    }
    
    // Close dialog when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === mobileMoneyDialog) {
            mobileMoneyDialog.style.display = 'none';
        }
    });
    
    // Form submission
    if (mobileMoneyForm) {
        mobileMoneyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const phoneNumber = document.getElementById('phoneNumber').value;
            const service = document.getElementById('service').value;
            
            // Display success message
            alert(`Payment request sent to ${phoneNumber} for ${service}. Please check your phone to complete the transaction.`);
            
            // Close dialog
            if (mobileMoneyDialog) {
                mobileMoneyDialog.style.display = 'none';
            }
            
            // If it's a cart payment, clear the cart
            if (service === 'cart-payment') {
                cart = [];
                saveCart();
                updateCartDisplay();
            }
        });
    }
    
    // Bank Payment Button functionality
    const bankPaymentBtn = document.getElementById('bankPaymentBtn');
    
    if (bankPaymentBtn) {
        bankPaymentBtn.addEventListener('click', function() {
            // Display bank payment info
            alert('Bank Transfer Information:\n\nBank: EcoBank\nAccount Name: Plastic solution Enterprises\nAccount Number: 1234567890\nReference: Your Name/Order Number');
        });
    }

    // Sustainability Calculator
    const calculateBtn = document.getElementById('calculate-btn');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const plasticWeight = parseFloat(document.getElementById('plastic-weight').value) || 0;
            const plasticType = document.getElementById('plastic-type').value;

            // Different plastics have different environmental impacts
            let co2Factor, energyFactor, waterFactor;

            switch (plasticType) {
                case 'pet':
                    co2Factor = 3.4; // kg CO2 per kg plastic
                    energyFactor = 85; // kWh per kg plastic
                    waterFactor = 250; // liters per kg plastic
                    break;
                case 'hdpe':
                    co2Factor = 2.8;
                    energyFactor = 77;
                    waterFactor = 170;
                    break;
                case 'pvc':
                    co2Factor = 3.8;
                    energyFactor = 90;
                    waterFactor = 300;
                    break;
                case 'ldpe':
                    co2Factor = 3.0;
                    energyFactor = 80;
                    waterFactor = 200;
                    break;
                case 'pp':
                    co2Factor = 3.2;
                    energyFactor = 83;
                    waterFactor = 220;
                    break;
                case 'ps':
                    co2Factor = 3.6;
                    energyFactor = 88;
                    waterFactor = 290;
                    break;
                default:
                    co2Factor = 3.0;
                    energyFactor = 80;
                    waterFactor = 200;
            }

            // Calculate savings
            const co2Saved = (plasticWeight * co2Factor).toFixed(2);
            const energySaved = (plasticWeight * energyFactor).toFixed(2);
            const waterSaved = (plasticWeight * waterFactor).toFixed(0);

            // Update results
            document.getElementById('co2-saved').textContent = `${co2Saved} kg`;
            document.getElementById('energy-saved').textContent = `${energySaved} kWh`;
            document.getElementById('water-saved').textContent = `${waterSaved} liters`;
        });
    }
});
