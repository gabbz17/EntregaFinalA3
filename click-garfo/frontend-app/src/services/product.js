import api from './api';

export const productService = {
    async getAll() {
        const response = await api.get('/products');
        return response.data;
    },

    async getById(id) {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    async getPopular() {
        const response = await api.get('/products/popular');
        return response.data;
    },

    async getSales() {
        const response = await api.get('/products/sales');
        return response.data;
    },

    async getByCategory(categoryId) {
        const response = await api.get(`/products/category/${categoryId}`);
        return response.data;
    },

    async getByRestaurant(restaurantId) {
        const response = await api.get(`/products/restaurant/${restaurantId}`);
        return response.data;
    },

    async create(product) {
        const response = await api.post('/products', product);
        return response.data;
    },

    async update(id, product) {
        const response = await api.put(`/products/${id}`, product);
        return response.data;
    },

    async delete(id) {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    },

    async addToCart(productId, quantity = 1) {
        const response = await api.post('/cart', {
            product_id: productId,
            quantity
        });
        return response.data;
    }
}; 