const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory storage
let users = [];
let products = [
    {
        id: 1,
        name: "iPhone 14 Pro",
        price: 999.99,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209",
        description: "Latest iPhone with dynamic island",
        category: "electronics",
        stock: 10
    },
    // ... other products
];

// Authentication routes
app.post('/api/register', (req, res) => {
    const { email, password, name } = req.body;
    const userExists = users.find(u => u.email === email);
    
    if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
    }
    
    const newUser = { id: users.length + 1, email, password, name };
    users.push(newUser);
    
    res.status(201).json({ message: 'User registered successfully' });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.json({ message: 'Login successful', user: { id: user.id, email: user.email, name: user.name } });
});

// Product routes
app.get('/api/products', (req, res) => {
    const { category } = req.query;
    if (category && category !== 'all') {
        const filteredProducts = products.filter(p => p.category === category);
        res.json(filteredProducts);
    } else {
        res.json(products);
    }
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

// Cart routes
let carts = {};

app.post('/api/cart', (req, res) => {
    const { userId, productId, quantity } = req.body;
    if (!carts[userId]) {
        carts[userId] = [];
    }
    
    const existingItem = carts[userId].find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity = quantity;
    } else {
        carts[userId].push({ productId, quantity });
    }
    
    res.json(carts[userId]);
});

app.get('/api/cart/:userId', (req, res) => {
    const userCart = carts[req.params.userId] || [];
    const cartWithDetails = userCart.map(item => {
        const product = products.find(p => p.id === item.productId);
        return { ...product, quantity: item.quantity };
    });
    
    res.json(cartWithDetails);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});