const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); 
const userRoutes = require('./routes/users');
const restaurantRoutes = require('./routes/restaurants');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const cartRoutes = require('./routes/cart');
const ratingsRoutes = require('./routes/ratings');
const orderCategoryRoutes = require('./routes/orderCategories');
const paymentMethodRoutes = require('./routes/paymentMethods');
const categoryRoutes = require('./routes/categories');
const { initializeDatabase } = require('./database/database');

const app = express();
const port = process.env.PORT || 3000;

console.log('Iniciando servidor...');

// Configuração do CORS
app.use(cors({
    origin: 'http://localhost:5173', // URL do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// Middleware para log de requisições
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Servir imagens da pasta backend/img
app.use('/img', express.static(path.join(__dirname, 'img')));


// Rotas da sua API
app.use('/users', userRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/cart', cartRoutes);
app.use('/ratings', ratingsRoutes);
app.use('/order-categories', orderCategoryRoutes);
app.use('/payment-methods', paymentMethodRoutes);
app.use('/categories', categoryRoutes);

// Middleware para tratamento de erros (coloque depois das rotas para pegar erros das rotas também)
app.use((err, req, res, next) => {
    console.error('Erro:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

// Inicializar banco de dados e iniciar o servidor
initializeDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
}).catch(err => {
    console.error('Erro ao inicializar banco de dados:', err);
});

module.exports = app; // Continue exportando a instância única de 'app'