const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderCategoryController');
const authMiddleware = require('../middleware/auth');

// Todas as rotas de categorias de pedidos precisam de autenticação
router.use(authMiddleware);

// Rotas para categorias de pedidos
router.get('/', controller.getAllCategories);
router.get('/:id', controller.getCategoryById);
router.post('/', controller.createCategory);
router.put('/:id', controller.updateCategory);
router.delete('/:id', controller.deleteCategory);

module.exports = router; 