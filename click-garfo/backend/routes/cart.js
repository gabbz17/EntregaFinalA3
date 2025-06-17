const express = require('express');
const router = express.Router();
const controller = require('../controllers/cartController');
const authMiddleware = require('../middleware/auth');

// Todas as rotas do carrinho precisam de autenticação
router.use(authMiddleware);

router.get('/', controller.getCart);
router.post('/add', controller.addToCart);
router.put('/:cartId/quantity', controller.updateQuantity);
router.delete('/:cartId', controller.removeFromCart);
router.delete('/', controller.clearCart);

module.exports = router; 