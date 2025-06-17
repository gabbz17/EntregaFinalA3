const Cart = require('../models/cartModel');

module.exports = {
    getCart(req, res) {
        Cart.getByUserId(req.userId, (err, items) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(items);
        });
    },

    addToCart(req, res) {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: "productId e quantity são obrigatórios" });
        }

        Cart.addItem(req.userId, productId, quantity, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "Item adicionado ao carrinho", cartId: result.lastID });
        });
    },

    updateQuantity(req, res) {
        const { cartId } = req.params;
        const { quantity } = req.body;

        if (!quantity) {
            return res.status(400).json({ message: "quantity é obrigatório" });
        }

        Cart.updateQuantity(cartId, quantity, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.changes === 0) {
                return res.status(404).json({ message: "Item não encontrado no carrinho" });
            }
            res.json({ message: "Quantidade atualizada" });
        });
    },

    removeFromCart(req, res) {
        const { cartId } = req.params;

        Cart.removeItem(cartId, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.changes === 0) {
                return res.status(404).json({ message: "Item não encontrado no carrinho" });
            }
            res.json({ message: "Item removido do carrinho" });
        });
    },

    clearCart(req, res) {
        Cart.clearCart(req.userId, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Carrinho limpo" });
        });
    }
}; 