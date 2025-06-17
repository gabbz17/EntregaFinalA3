const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

module.exports = {
    getAllOrders(req, res) {
        Order.getAll((err, orders) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(orders);
        });
    },

    getOrderById(req, res) {
        const { id } = req.params;
        
        Order.getById(id, (err, order) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!order) return res.status(404).json({ message: "Pedido não encontrado" });

            Order.getOrderItems(id, (err, items) => {
                if (err) return res.status(500).json({ error: err.message });
                order.items = items;
                res.json(order);
            });
        });
    },

    getUserOrders(req, res) {
        Order.getUserOrders(req.userId, (err, orders) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(orders);
        });
    },

    getRestaurantOrders(req, res) {
        const { restaurantId } = req.params;
        Order.getRestaurantOrders(restaurantId, (err, orders) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(orders);
        });
    },

    createOrder(req, res) {
        const { restaurantId, totalPrice, paymentMethod, categoryId } = req.body;

        if (!restaurantId || !totalPrice || !paymentMethod || !categoryId) {
            return res.status(400).json({ message: "restaurantId, totalPrice, paymentMethod e categoryId são obrigatórios" });
        }

        // Primeiro, criar o pedido
        Order.create({
            userId: req.userId,
            restaurantId,
            totalPrice,
            paymentMethod,
            categoryId
        }, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            // Depois, atualizar os itens do carrinho com o ID do pedido
            Cart.updateCartWithOrder(req.userId, result.id, (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ 
                    message: "Pedido criado com sucesso", 
                    orderId: result.id 
                });
            });
        });
    },

    updateOrderStatus(req, res) {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "status é obrigatório" });
        }

        const validStatus = ['pendente', 'preparando', 'em_entrega', 'entregue', 'cancelado'];
        if (!validStatus.includes(status)) {
            return res.status(400).json({ message: "status inválido" });
        }

        Order.updateStatus(id, status, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.changes === 0) {
                return res.status(404).json({ message: "Pedido não encontrado" });
            }
            res.json({ message: "Status do pedido atualizado" });
        });
    },

    deleteOrder(req, res) {
        const { id } = req.params;
        Order.delete(id, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.changes === 0) {
                return res.status(404).json({ message: "Pedido não encontrado" });
            }
            res.json({ message: "Pedido excluído com sucesso" });
        });
    }
}; 