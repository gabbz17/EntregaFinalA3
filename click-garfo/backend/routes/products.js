const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotas públicas
router.get('/', productsController.getAllProducts);
router.get('/popular', productsController.getPopularProducts);
router.get('/sales', productsController.getSalesProducts);
router.get('/category/:categoryId', productsController.getProductsByCategory);
router.get('/restaurant/:restaurantId', productsController.getProductsByRestaurant);
router.get('/:id', productsController.getProductById);

// Rotas protegidas
router.post('/create', productsController.createProduct);
router.put('/:id', authMiddleware, productsController.updateProduct);
router.delete('/:id', authMiddleware, productsController.deleteProductById);

module.exports = router; 