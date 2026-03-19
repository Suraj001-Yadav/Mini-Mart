// API base URL
const API_BASE_URL = 'http://localhost:5000/api';

// API service object
const api = {
    // Auth endpoints
    login: async (credentials) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        return response.json();
    },

    register: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return response.json();
    },

    // Product endpoints
    getProducts: async () => {
        const response = await fetch(`${API_BASE_URL}/products`);
        return response.json();
    },

    getProductById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        return response.json();
    },

    // Cart endpoints
    getCart: async () => {
        const response = await fetch(`${API_BASE_URL}/cart`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.json();
    },

    addToCart: async (productId, quantity) => {
        const response = await fetch(`${API_BASE_URL}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ productId, quantity }),
        });
        return response.json();
    },

    // Wishlist endpoints
    getWishlist: async () => {
        const response = await fetch(`${API_BASE_URL}/wishlist`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.json();
    },

    addToWishlist: async (productId) => {
        const response = await fetch(`${API_BASE_URL}/wishlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ productId }),
        });
        return response.json();
    },

    // Order endpoints
    createOrder: async (orderData) => {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(orderData),
        });
        return response.json();
    },

    // Payment endpoints
    processPayment: async (paymentData) => {
        const response = await fetch(`${API_BASE_URL}/payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(paymentData),
        });
        return response.json();
    }
};

// Export the API service
window.api = api; 