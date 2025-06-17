import api from './api';

export const orderService = {
    // Buscar todos os pedidos do usuário
    async getAll() {
        const response = await api.get('/orders');
        return response.data;
    },

    // Buscar pedido por ID
    async getById(id) {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },

    // Criar novo pedido
    async create(orderData) {
        const response = await api.post('/orders', orderData);
        return response.data;
    },

    // Atualizar status do pedido
    async updateStatus(id, status) {
        const response = await api.put(`/orders/${id}/status`, { status });
        return response.data;
    },

    // Cancelar pedido
    async cancel(id) {
        const response = await api.put(`/orders/${id}/cancel`);
        return response.data;
    },

    // Buscar pedidos por restaurante
    async getByRestaurant(restaurantId) {
        const response = await api.get(`/orders/restaurant/${restaurantId}`);
        return response.data;
    },

    // Buscar pedidos por categoria
    async getByCategory(categoryId) {
        const response = await api.get(`/orders/category/${categoryId}`);
        return response.data;
    },

    // Buscar histórico de pedidos
    async getHistory() {
        const response = await api.get('/orders/history');
        return response.data;
    }
}; 