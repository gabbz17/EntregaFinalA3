const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotas públicas
router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getCategoryById);

// Rotas protegidas
router.post('/', authMiddleware, categoriesController.createCategory);
router.put('/:id', authMiddleware, categoriesController.updateCategory);
router.delete('/:id', authMiddleware, categoriesController.deleteCategoryById);

module.exports = router; 