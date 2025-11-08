// Global variables
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        price: 1299.99,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch_GEO_US?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1693009284541",
        description: "Latest iPhone with A17 Pro chip, 48MP camera system",
        category: "electronics"
    },
    {
        id: 2,
        name: "Samsung Galaxy S23 Ultra",
        price: 1199.99,
        image: "https://m.media-amazon.com/images/I/71Sa3dqTqGL._AC_SL1500_.jpg",
        description: "200MP camera, S Pen included, 6.8-inch display",
        category: "electronics"
    },
    {
        id: 3,
        name: "MacBook Pro 16",
        price: 2499.99,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spacegray-select-202301?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1671304673202",
        description: "M2 Max chip, 32GB RAM, 1TB SSD",
        category: "electronics"
    },
    {
        id: 4,
        name: "Nike Air Jordan 1",
        price: 179.99,
        image: "https://m.media-amazon.com/images/I/71VaQ+V6XnL._AC_UY695_.jpg",
        description: "Classic basketball sneakers in premium leather",
        category: "fashion"
    },
    {
        id: 5,
        name: "PS5 Digital Edition",
        price: 399.99,
        image: "https://m.media-amazon.com/images/I/51mWHXY8hyL._AC_SL1500_.jpg",
        description: "Next-gen gaming console with DualSense controller",
        category: "electronics"
    },
    {
        id: 6,
        name: 'LG C3 65-inch OLED TV',
        price: 2499.99,
        image: "https://m.media-amazon.com/images/I/81PXly1J5LL._AC_SL1500_.jpg",
        description: "4K OLED evo Gallery Edition Smart TV",
        category: "electronics"
    },
    {
        id: 7,
        name: "Ray-Ban Aviator",
        price: 169.99,
        image: "https://m.media-amazon.com/images/I/61QnUPxzOZL._AC_UX679_.jpg",
        description: "Classic aviator sunglasses with polarized lenses",
        category: "fashion"
    },
    {
        id: 8,
        name: "Leather Weekend Bag",
        price: 299.99,
        image: "https://m.media-amazon.com/images/I/71wp0r+v59L._AC_UY695_.jpg",
        description: "Premium leather travel bag with laptop compartment",
        category: "fashion"
    },
    {
        id: 9,
        name: "Peloton Bike+",
        price: 2495.00,
        image: "https://m.media-amazon.com/images/I/61yoX4NRH8L._AC_SL1500_.jpg",
        description: "Premium smart indoor cycling bike with rotating screen",
        category: "sports"
    },
    {
        id: 10,
        name: "Wilson Pro Tennis Racket",
        price: 249.99,
        image: "https://m.media-amazon.com/images/I/71RKgkHvhGL._AC_SL1500_.jpg",
        description: "Professional grade tennis racket with case",
        category: "sports"
    },
    {
        id: 11,
        name: "Dyson Airwrap",
        price: 599.99,
        image: "https://m.media-amazon.com/images/I/61jzxQ63T-L._SL1500_.jpg",
        description: "Complete hair styling system for multiple hair types",
        category: "beauty"
    },
    {
        id: 12,
        name: "Smart Water Bottle",
        price: 69.99,
        image: "https://m.media-amazon.com/images/I/61hjk2HTkCS._AC_SL1500_.jpg",
        description: "Tracks water intake and reminds you to stay hydrated",
        category: "beauty"
    },
    {
        id: 13,
        name: "iRobot Roomba j7+",
        price: 799.99,
        image: "https://m.media-amazon.com/images/I/71KPj7IezLL._AC_SL1500_.jpg",
        description: "Smart robot vacuum with self-emptying base",
        category: "home"
    },
    {
        id: 14,
        name: "Smart Garden 9",
        price: 199.99,
        image: "https://m.media-amazon.com/images/I/81c+DmZg7LL._AC_SL1500_.jpg",
        description: "Indoor garden with LED grow lights",
        category: "home"
    },
    {
        id: 15,
        name: "LEGO Star Wars Set",
        price: 159.99,
        image: "https://m.media-amazon.com/images/I/81OV2+P+8bL._AC_SL1500_.jpg",
        description: "Millennium Falcon building set with minifigures",
        category: "toys"
    }
];

let cart = [];
let wishlist = [];

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('products');
    const cartSection = document.getElementById('cart');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    
    let currentUser = null;

    // Display products
    function displayProducts(filteredProducts = products) {
        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-category="${product.category}">
                <div class="product-badge">New</div>
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <div class="product-buttons">
                        <button onclick="addToCart(${product.id})" class="add-to-cart-btn">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button onclick="addToWishlist(${product.id})" class="wishlist-btn">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Filter products
    function filterProducts(category) {
        const filtered = category === 'all' 
            ? products 
            : products.filter(p => p.category === category);
        displayProducts(filtered);
    }

    // Add to cart
    window.addToCart = function(productId) {
        if (!currentUser) {
            loginModal.style.display = 'block';
            return;
        }

        const product = products.find(p => p.id === productId);
        if (product) {
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCart();
        }
    }

    // Update cart
    function updateCart() {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty</p>';
            cartTotal.textContent = '$0.00';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            `).join('');

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = `$${total.toFixed(2)}`;
        }
    }

    // Update quantity
    window.updateQuantity = function(productId, newQuantity) {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }

        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            updateCart();
        }
    }

    // Remove from cart
    window.removeFromCart = function(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    // Add to wishlist
    window.addToWishlist = function(productId) {
        if (!currentUser) {
            loginModal.style.display = 'block';
            return;
        }

        const product = products.find(p => p.id === productId);
        if (product) {
            const exists = wishlist.some(item => item.id === productId);
            if (!exists) {
                wishlist.push(product);
                alert('Added to wishlist!');
            } else {
                wishlist = wishlist.filter(item => item.id !== productId);
                alert('Removed from wishlist!');
            }
        }
    }

    // Event Listeners
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProducts(btn.dataset.category);
            showProductsSection();
        });
    });

    document.getElementById('homeLink').addEventListener('click', (e) => {
        e.preventDefault();
        showProductsSection();
        document.querySelector('.filter-btn[data-category="all"]').click();
    });

    document.getElementById('cartLink').addEventListener('click', (e) => {
        e.preventDefault();
        if (!currentUser) {
            loginModal.style.display = 'block';
            return;
        }
        toggleCartSection();
    });

    function showProductsSection() {
        cartSection.style.display = 'none';
        productsGrid.style.display = 'grid';
        document.querySelector('.category-filter').style.display = 'flex';
    }

    function showCartSection() {
        cartSection.style.display = 'block';
        productsGrid.style.display = 'none';
        document.querySelector('.category-filter').style.display = 'none';
    }

    function toggleCartSection() {
        if (cartSection.style.display === 'none') {
            showCartSection();
        } else {
            showProductsSection();
        }
    }

    document.getElementById('loginBtn').addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    document.getElementById('signupBtn').addEventListener('click', () => {
        signupModal.style.display = 'block';
    });

    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', () => {
            loginModal.style.display = 'none';
            signupModal.style.display = 'none';
        });
    });

    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        currentUser = { email: e.target.elements[0].value };
        loginModal.style.display = 'none';
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('signupBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'inline';
    });

    document.getElementById('signupForm').addEventListener('submit', (e) => {
        e.preventDefault();
        currentUser = {
            name: e.target.elements[0].value,
            email: e.target.elements[1].value
        };
        signupModal.style.display = 'none';
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('signupBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'inline';
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
        currentUser = null;
        cart = [];
        wishlist = [];
        updateCart();
        document.getElementById('loginBtn').style.display = 'inline';
        document.getElementById('signupBtn').style.display = 'inline';
        document.getElementById('logoutBtn').style.display = 'none';
        cartSection.style.display = 'none';
        productsGrid.style.display = 'grid';
    });

    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        alert('Thank you for your purchase!');
        cart = [];
        updateCart();
        cartSection.style.display = 'none';
        productsGrid.style.display = 'grid';
    });

    // Initial display
    displayProducts();
    updateCart();
});
