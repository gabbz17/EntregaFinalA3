const { db } = require('./database/database');

async function cleanDuplicates() {
    console.log('Limpando dados duplicados...\n');

    // Limpar restaurantes duplicados
    console.log('=== LIMPANDO RESTAURANTES DUPLICADOS ===');
    db.run(`
        DELETE FROM restaurants 
        WHERE id NOT IN (
            SELECT MIN(id) 
            FROM restaurants 
            GROUP BY name, phone
        )
    `, function(err) {
        if (err) {
            console.error('Erro ao limpar restaurantes duplicados:', err);
        } else {
            console.log(`Restaurantes duplicados removidos: ${this.changes}`);
        }
    });

    // Limpar categorias duplicadas
    console.log('\n=== LIMPANDO CATEGORIAS DUPLICADAS ===');
    db.run(`
        DELETE FROM categories 
        WHERE id NOT IN (
            SELECT MIN(id) 
            FROM categories 
            GROUP BY title
        )
    `, function(err) {
        if (err) {
            console.error('Erro ao limpar categorias duplicadas:', err);
        } else {
            console.log(`Categorias duplicadas removidas: ${this.changes}`);
        }
    });

    // Limpar categorias de pedidos duplicadas
    console.log('\n=== LIMPANDO CATEGORIAS DE PEDIDOS DUPLICADAS ===');
    db.run(`
        DELETE FROM order_categories 
        WHERE id NOT IN (
            SELECT MIN(id) 
            FROM order_categories 
            GROUP BY name
        )
    `, function(err) {
        if (err) {
            console.error('Erro ao limpar categorias de pedidos duplicadas:', err);
        } else {
            console.log(`Categorias de pedidos duplicadas removidas: ${this.changes}`);
        }
    });

    // Limpar produtos duplicados
    console.log('\n=== LIMPANDO PRODUTOS DUPLICADOS ===');
    db.run(`
        DELETE FROM products 
        WHERE id NOT IN (
            SELECT MIN(id) 
            FROM products 
            GROUP BY title, restaurant_id
        )
    `, function(err) {
        if (err) {
            console.error('Erro ao limpar produtos duplicados:', err);
        } else {
            console.log(`Produtos duplicados removidos: ${this.changes}`);
        }
    });

    // Atualizar as chaves estrangeiras
    console.log('\n=== ATUALIZANDO CHAVES ESTRANGEIRAS ===');
    
    // Atualizar category_id em restaurantes
    db.run(`
        UPDATE restaurants 
        SET category_id = (
            SELECT MIN(id) 
            FROM categories 
            WHERE title = (
                SELECT title 
                FROM categories 
                WHERE id = restaurants.category_id
            )
        )
    `, function(err) {
        if (err) {
            console.error('Erro ao atualizar category_id em restaurantes:', err);
        } else {
            console.log(`Chaves estrangeiras de categorias em restaurantes atualizadas: ${this.changes}`);
        }
    });

    // Atualizar category_id e restaurant_id em produtos
    db.run(`
        UPDATE products 
        SET category_id = (
            SELECT MIN(id) 
            FROM categories 
            WHERE title = (
                SELECT title 
                FROM categories 
                WHERE id = products.category_id
            )
        ),
        restaurant_id = (
            SELECT MIN(id) 
            FROM restaurants 
            WHERE name = (
                SELECT name 
                FROM restaurants 
                WHERE id = products.restaurant_id
            )
        )
    `, function(err) {
        if (err) {
            console.error('Erro ao atualizar chaves estrangeiras em produtos:', err);
        } else {
            console.log(`Chaves estrangeiras em produtos atualizadas: ${this.changes}`);
        }
    });
}

cleanDuplicates(); 