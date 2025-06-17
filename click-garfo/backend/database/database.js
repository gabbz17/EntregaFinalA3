const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados SQLite');
    }
});

// Função para criar as tabelas
const createTables = () => {
    return new Promise((resolve, reject) => {
        console.log('Iniciando criação das tabelas...');
        db.serialize(() => {
            // Primeiro, criar tabelas sem dependências
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                name TEXT, 
                email TEXT UNIQUE, 
                phone TEXT, 
                password TEXT, 
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP 
            )`, (err) => {
                if (err) {
                    console.error('Erro ao criar tabela users:', err);
                } else {
                    console.log('Tabela users criada/verificada com sucesso');
                }
            });

            db.run(`CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                title TEXT, 
                subtitle TEXT, 
                description TEXT, 
                photo TEXT 
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS order_categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                description TEXT
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS payment_methods (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                description TEXT,
                icon TEXT
            )`);

            // Depois, criar tabelas com dependências simples
            db.run(`CREATE TABLE IF NOT EXISTS restaurants (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                name TEXT, 
                phone TEXT, 
                password TEXT, 
                category_id INTEGER, 
                stars FLOAT DEFAULT 0, 
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (category_id) REFERENCES categories(id)
            )`);

            // Por fim, criar tabelas com múltiplas dependências
            db.run(`CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                title TEXT, 
                subtitle TEXT, 
                description TEXT, 
                photo TEXT, 
                price FLOAT, 
                category_id INTEGER, 
                restaurant_id INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (category_id) REFERENCES categories(id),
                FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                restaurant_id INTEGER,
                status TEXT,
                total_price FLOAT,
                payment_method TEXT,
                category_id INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
                FOREIGN KEY (category_id) REFERENCES order_categories(id)
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS carts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                product_id INTEGER,
                quantity INTEGER,
                order_id INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (product_id) REFERENCES products(id),
                FOREIGN KEY (order_id) REFERENCES orders(id)
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS restaurant_ratings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                restaurant_id INTEGER,
                rating INTEGER,
                comment TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS favorites (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                restaurant_id INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
                UNIQUE(user_id, restaurant_id)
            )`);

            resolve();
        });
    });
};

// Função para inserir dados iniciais
const insertInitialData = async () => {
    try {
        // Inserir categorias
        const categories = [
            ['Pizza', 'As melhores pizzas da cidade', 'Pizzas artesanais feitas com ingredientes selecionados', 'marguerita.png'],
            ['Hambúrguer', 'Hambúrgueres gourmet', 'Carnes selecionadas e pães artesanais', 'hamburguer.png'],
            ['Japonesa', 'Culinária japonesa autêntica', 'Sushis, sashimis e pratos quentes', 'sushi.png']
        ];

        for (const category of categories) {
            await db.run('INSERT OR IGNORE INTO categories (title, subtitle, description, photo) VALUES (?, ?, ?, ?)', category);
        }

        // Inserir categorias de pedidos
        const orderCategories = [
            ['Delivery', 'Pedidos para entrega em endereço específico'],
            ['Retirada', 'Pedidos para retirada no local'],
            ['Mesa', 'Pedidos para consumo no local']
        ];

        for (const category of orderCategories) {
            await db.run('INSERT OR IGNORE INTO order_categories (name, description) VALUES (?, ?)', category);
        }

        // Inserir restaurantes
        const restaurants = [
            ['Pizzaria Express', '11999999999', await bcrypt.hash('123456', 10), 1],
            ['Burger House', '11988888888', await bcrypt.hash('123456', 10), 2],
            ['Sushi Master', '11977777777', await bcrypt.hash('123456', 10), 3]
        ];

        for (const restaurant of restaurants) {
            await db.run('INSERT OR IGNORE INTO restaurants (name, phone, password, category_id) VALUES (?, ?, ?, ?)', restaurant);
        }

        // Inserir produtos
        const products = [
            ['Pizza Margherita', 'Molho de tomate, mussarela, tomate e manjericão', 'Pizza tradicional italiana', 'marguerita.png', 49.90, 1, 1],
            ['Pizza Pepperoni', 'Molho de tomate, mussarela e pepperoni', 'Pizza com pepperoni importado', 'pepperoni.jpg', 59.90, 1, 1],
            ['X-Burger', 'Hambúrguer artesanal, queijo, alface, tomate e molho especial', 'Hambúrguer gourmet', 'hamburguer.png', 29.90, 2, 2],
            ['X-Bacon', 'Hambúrguer artesanal, queijo, bacon, alface, tomate e molho especial', 'Hambúrguer com bacon', 'hamburguer.png', 34.90, 2, 2],
            ['Combo Sushi', '12 peças de sushi variado', 'Mix de sushis', 'sushi.png', 89.90, 3, 3],
            ['Temaki', 'Temaki de salmão com cream cheese', 'Temaki especial', 'temaki.png', 39.90, 3, 3],
            ['Pizza Frango', 'Molho de tomate, mussarela, frango e catupiry', 'Pizza de frango com catupiry', 'frango.png', 54.90, 1, 1],
            ['X-Tudo', 'Hambúrguer artesanal, queijo, bacon, ovo, presunto, alface, tomate e molho especial', 'Hambúrguer completo', 'hamburguer.png', 39.90, 2, 2],
            ['Combo Hot Roll', '8 peças de hot roll', 'Hot roll com cream cheese', 'sushi.png', 49.90, 3, 3],
            ['Pizza Quatro Queijos', 'Molho de tomate, mussarela, parmesão, gorgonzola e catupiry', 'Pizza quatro queijos', 'frango.png', 64.90, 1, 1]
        ];

        for (const product of products) {
            await db.run('INSERT OR IGNORE INTO products (title, subtitle, description, photo, price, category_id, restaurant_id) VALUES (?, ?, ?, ?, ?, ?, ?)', product);
        }

        // Inserir modos de pagamento
        const paymentMethods = [
            ['Cartão de Crédito', 'Pagamento via cartão de crédito', 'credit-card.png'],
            ['PIX', 'Pagamento instantâneo via PIX', 'pix.png'],
            ['Dinheiro', 'Pagamento em dinheiro na entrega', 'money.png']
        ];

        for (const method of paymentMethods) {
            await db.run('INSERT OR IGNORE INTO payment_methods (name, description, icon) VALUES (?, ?, ?)', method);
        }

        console.log('Dados iniciais inseridos com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir dados iniciais:', error);
    }
};

// Inicializar o banco de dados
const initializeDatabase = async () => {
    try {
        await createTables();
        await insertInitialData();
        console.log('Banco de dados inicializado com sucesso!');
    } catch (error) {
        console.error('Erro ao inicializar banco de dados:', error);
        throw error;
    }
};

// Exportar o objeto db e a função de inicialização
module.exports = {
    db,
    initializeDatabase
};