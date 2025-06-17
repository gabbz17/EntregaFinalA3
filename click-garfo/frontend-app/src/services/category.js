import api from './api';

export const categoryService = {
    // Buscar todas as categorias
    async getAll() {
        const response = await api.get('/categories');
        return response.data;
    },

    // Buscar categoria por ID
    async getById(id) {
        const response = await api.get(`/categories/${id}`);
        return response.data;
    },

    // Buscar restaurantes por categoria
    async getRestaurants(categoryId) {
        const response = await api.get(`/restaurants/category/${categoryId}`);
        return response.data;
    }
}; 