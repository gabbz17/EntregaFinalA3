import api from './api';

export const cartService = {
    // Buscar itens do carrinho
    async getItems() {
        const response = await api.get('/cart');
        return response.data;
    },

    // Adicionar item ao carrinho
    async addItem(productId, quantity = 1) {
        const response = await api.post('/cart', {
            product_id: productId,
            quantity
        });
        return response.data;
    },

    // Atualizar quantidade do item
    async updateQuantity(itemId, quantity) {
        const response = await api.put(`/cart/${itemId}`, {
            quantity
        });
        return response.data;
    },

    // Remover item do carrinho
    async removeItem(itemId) {
        const response = await api.delete(`/cart/${itemId}`);
        return response.data;
    },

    // Limpar carrinho
    async clear() {
        const response = await api.delete('/cart');
        return response.data;
    },

    // Finalizar pedido
    async checkout(orderData) {
        const response = await api.post('/orders', orderData);
        return response.data;
    }
}; 