const express = require('express');
const router = express.Router();
const restaurantsController = require('../controllers/restaurantsController');
const authMiddleware = require('../middleware/authMiddleware');


// Rotas públicas
router.post('/create', restaurantsController.createRestaurant);
router.get('/', restaurantsController.getAllRestaurants);
router.get('/popular', restaurantsController.getPopularRestaurants);
router.get('/category/:categoryId', restaurantsController.getRestaurantsByCategory);

//  Favoritos antes de /:id
router.get('/favorites', authMiddleware, restaurantsController.getFavoriteRestaurants);
router.post('/favorites/:id', authMiddleware, restaurantsController.toggleFavorite);

router.get('/:id/products', restaurantsController.getRestaurantProducts);
router.get('/:id', restaurantsController.getRestaurantById);

// Rotas protegidas
router.put('/:id', authMiddleware, restaurantsController.updateRestaurant);
router.delete('/:id', authMiddleware, restaurantsController.deleteRestaurantById);


module.exports = router;