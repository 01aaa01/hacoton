const API_URL = 'http://localhost:3000/api';

const api = {
    // Authentication
    register: async (userData) => {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return response.json();
    },

    login: async (credentials) => {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        return response.json();
    },

    // Products
    getProducts: async (category = 'all') => {
        const response = await fetch(`${API_URL}/products?category=${category}`);
        return response.json();
    },

    getProduct: async (productId) => {
        const response = await fetch(`${API_URL}/products/${productId}`);
        return response.json();
    },

    // Cart
    getCart: async (userId) => {
        const response = await fetch(`${API_URL}/cart/${userId}`);
        return response.json();
    },

    updateCart: async (userId, productId, quantity) => {
        const response = await fetch(`${API_URL}/cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, productId, quantity })
        });
        return response.json();
    }
};