import api from './api';

export const restaurantService = {
    // Buscar todos os restaurantes
    async getAll() {
        const response = await api.get('/restaurants');
        return response.data;
    },

    // Buscar restaurante por ID
    async getById(id) {
        const response = await api.get(`/restaurants/${id}`);
        return response.data;
    },

    // Buscar restaurantes populares
    async getPopular() {
        const response = await api.get('/restaurants/popular');
        return response.data;
    },

    // Buscar restaurantes por categoria
    async getByCategory(categoryId) {
        const response = await api.get(`/restaurants/category/${categoryId}`);
        return response.data;
    },

    // Buscar produtos do restaurante
    async getProducts(id) {
        const response = await api.get(`/restaurants/${id}/products`);
        return response.data;
    },

    // Buscar avaliações do restaurante
    async getRatings(id) {
        const response = await api.get(`/ratings/restaurant/${id}`);
        return response.data;
    },

    // Criar avaliação
    async createRating(data) {
        const response = await api.post('/ratings', data);
        return response.data;
    },

    // Criar restaurante
    async create(restaurant) {
        const response = await api.post('/restaurants', restaurant);
        return response.data;
    },

    // Atualizar restaurante
    async update(id, restaurant) {
        const response = await api.put(`/restaurants/${id}`, restaurant);
        return response.data;
    },

    // Deletar restaurante
    async delete(id) {
        const response = await api.delete(`/restaurants/${id}`);
        return response.data;
    },

    // Adicionar/remover dos favoritos
    async toggleFavorite(restaurantId) {
        const response = await api.post(`/restaurants/favorites/${restaurantId}`);
        return response.data;
    },

    // Buscar restaurantes favoritos
    async getFavorites() {
        const response = await api.get('/restaurants/favorites');
        return response.data;
    }
}; 