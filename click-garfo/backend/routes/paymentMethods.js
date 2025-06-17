const express = require('express');
const router = express.Router();
const controller = require('../controllers/paymentMethodController');
const authMiddleware = require('../middleware/auth');

// Todas as rotas de métodos de pagamento precisam de autenticação
router.use(authMiddleware);

// Rotas para métodos de pagamento
router.get('/', controller.getAllMethods);
router.get('/:id', controller.getMethodById);
router.post('/', controller.createMethod);
router.put('/:id', controller.updateMethod);
router.delete('/:id', controller.deleteMethod);

module.exports = router; 