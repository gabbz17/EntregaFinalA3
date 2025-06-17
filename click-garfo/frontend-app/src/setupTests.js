import '@testing-library/jest-dom';

// Mock do localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
};
global.localStorage = localStorageMock;

// Mock do window.location
delete window.location;
window.location = { href: '' };

// Usar o mock de __mocks__/axios.js
jest.mock('axios');

// Mock das respostas da API
const mockResponses = {
    login: { token: 'fake-token' },
    restaurants: [
        { id: 1, name: 'Restaurante 1' },
        { id: 2, name: 'Restaurante 2' }
    ],
    products: [
        { id: 1, name: 'Produto 1', price: 10.00 },
        { id: 2, name: 'Produto 2', price: 20.00 }
    ],
    cart: [
        { id: 1, productId: 1, quantity: 2 }
    ],
    orders: [
        { id: 1, status: 'pending' }
    ],
    ratings: [
        { id: 1, rating: 5, comment: 'Ótimo!' }
    ]
};

function getPath(url) {
    try {
        const u = new URL(url, 'http://localhost:3000');
        return u.pathname;
    } catch {
        return url;
    }
}

// Configurar respostas padrão para os mocks
const axios = require('axios');
const instance = axios.create();
instance.get.mockImplementation((url) => {
    const path = getPath(url);
    if (path === '/restaurants') return Promise.resolve({ data: mockResponses.restaurants });
    if (path.startsWith('/restaurants/') && path.endsWith('/products')) return Promise.resolve({ data: mockResponses.products });
    if (path.startsWith('/restaurants/')) {
        // Buscar restaurante por ID
        const id = parseInt(path.split('/')[2], 10);
        const restaurant = mockResponses.restaurants.find(r => r.id === id);
        return Promise.resolve({ data: restaurant || {} });
    }
    if (path === '/cart') return Promise.resolve({ data: mockResponses.cart });
    if (path === '/orders/my-orders') return Promise.resolve({ data: mockResponses.orders });
    if (path.startsWith('/ratings/restaurant/')) return Promise.resolve({ data: mockResponses.ratings });
    return Promise.resolve({ data: {} });
});

instance.post.mockImplementation((url, data) => {
    const path = getPath(url);
    if (path === '/users/login') return Promise.resolve({ data: mockResponses.login });
    if (path === '/cart/add') return Promise.resolve({ data: { id: 1 } });
    if (path === '/orders') return Promise.resolve({ data: { id: 1 } });
    if (path === '/ratings') return Promise.resolve({ data: { id: 1 } });
    return Promise.resolve({ data: {} });
}); 