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

function getMock(url) {
    const path = getPath(url);
    if (path === '/restaurants') return mockResponses.restaurants;
    if (path.startsWith('/restaurants/') && path.endsWith('/products')) return mockResponses.products;
    if (path.startsWith('/restaurants/')) {
        const id = parseInt(path.split('/')[2], 10);
        const restaurant = mockResponses.restaurants.find(r => r.id === id);
        return restaurant || {};
    }
    if (path === '/cart') return mockResponses.cart;
    if (path === '/orders') return mockResponses.orders;
    if (path.startsWith('/ratings/restaurant/')) return mockResponses.ratings;
    if (path === '/users/login') return mockResponses.login;
    if (path === '/cart/add') return { id: 1 };
    if (path === '/orders') return { id: 1 };
    if (path === '/ratings') return { id: 1 };
    return {};
}

function createInstance() {
    return {
        interceptors: {
            request: { use: jest.fn() },
            response: { use: jest.fn() }
        },
        get: jest.fn((url) => Promise.resolve({ data: getMock(url) })),
        post: jest.fn((url, data) => Promise.resolve({ data: getMock(url) })),
        put: jest.fn((url, data) => Promise.resolve({ data: {} })),
        delete: jest.fn((url) => Promise.resolve({ data: {} }))
    };
}

const mockAxios = {
    create: jest.fn(() => createInstance())
};

module.exports = mockAxios; 