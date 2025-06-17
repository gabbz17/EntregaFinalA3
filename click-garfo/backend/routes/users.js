const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const authMiddleware = require('../middleware/auth');

// Rotas públicas
router.post('/create', controller.createUser);
router.post('/login', controller.loginUser);

// Rotas protegidas
router.get('/', authMiddleware, controller.getAllUsers);
router.get('/:id', authMiddleware, controller.getUserById);
router.delete('/:id', authMiddleware, controller.deleteUserById);
router.put('/:id', authMiddleware, controller.updateUser);

module.exports = router;