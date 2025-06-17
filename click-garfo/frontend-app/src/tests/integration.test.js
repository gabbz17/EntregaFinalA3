import { authService } from '../services';
import { restaurantService } from '../services';
import { cartService } from '../services';
import { orderService } from '../services';

describe('Testes de Integração', () => {
    // Teste de autenticação
    test('Login de usuário', async () => {
        const response = await authService.login('teste@teste.com', '123456');
        expect(response).toHaveProperty('token');
    });

    // Teste de restaurantes
    test('Listar restaurantes', async () => {
        const restaurants = await restaurantService.getAll();
        expect(Array.isArray(restaurants)).toBe(true);
        expect(restaurants.length).toBeGreaterThan(0);
    });

    test('Buscar restaurante por ID', async () => {
        const restaurant = await restaurantService.getById(1);
        expect(restaurant).toHaveProperty('id');
        expect(restaurant).toHaveProperty('name');
    });

    // Teste de produtos
    test('Listar produtos de um restaurante', async () => {
        const products = await restaurantService.getProducts(1);
        expect(Array.isArray(products)).toBe(true);
    });

    // Teste de carrinho
    test('Adicionar item ao carrinho', async () => {
        const response = await cartService.addItem(1, 1); // productId: 1, quantity: 1
        expect(response).toHaveProperty('id');
    });

    test('Listar itens do carrinho', async () => {
        const cart = await cartService.getCart();
        expect(Array.isArray(cart)).toBe(true);
    });

    // Teste de pedidos
    test('Criar pedido', async () => {
        const orderData = {
            restaurantId: 1,
            items: [{ productId: 1, quantity: 1 }],
            paymentMethod: 'credit-card',
            categoryId: 1
        };
        const order = await orderService.createOrder(orderData);
        expect(order).toHaveProperty('id');
    });

    test('Listar pedidos do usuário', async () => {
        const orders = await orderService.getMyOrders();
        expect(Array.isArray(orders)).toBe(true);
    });

    // Teste de avaliações
    test('Criar avaliação', async () => {
        const ratingData = {
            restaurantId: 1,
            rating: 5,
            comment: 'Ótimo restaurante!'
        };
        const rating = await restaurantService.createRating(ratingData);
        expect(rating).toHaveProperty('id');
    });

    test('Listar avaliações de um restaurante', async () => {
        const ratings = await restaurantService.getRatings(1);
        expect(Array.isArray(ratings)).toBe(true);
    });
}); 