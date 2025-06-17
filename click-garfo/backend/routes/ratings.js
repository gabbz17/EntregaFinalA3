const express = require('express');
const router = express.Router();
const controller = require('../controllers/ratingController');
const authMiddleware = require('../middleware/auth');

// Todas as rotas de avaliações precisam de autenticação
router.use(authMiddleware);

// Rotas para usuários
router.get('/my-ratings', controller.getUserRatings);
router.post('/', controller.createRating);
router.put('/:id', controller.updateRating);
router.delete('/:id', controller.deleteRating);

// Rotas para visualização
router.get('/restaurant/:restaurantId', controller.getRestaurantRatings);

module.exports = router; 