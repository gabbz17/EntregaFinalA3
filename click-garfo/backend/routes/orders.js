const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

// Todas as rotas de pedidos precisam de autenticação
router.use(authMiddleware);

// Rotas para usuários
router.get('/my-orders', controller.getUserOrders);
router.post('/', controller.createOrder);
router.get('/:id', controller.getOrderById);
router.delete('/:id', controller.deleteOrder);

// Rotas para restaurantes
router.get('/restaurant/:restaurantId', controller.getRestaurantOrders);
router.put('/:id/status', controller.updateOrderStatus);

module.exports = router; 