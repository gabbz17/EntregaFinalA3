const { db } = require('./database/database');


//TESTE DE COMMIT

async function checkData() {
    console.log('Verificando dados no banco...\n');

    // Verificar restaurantes
    console.log('=== RESTAURANTES ===');
    db.all('SELECT * FROM restaurants', (err, rows) => {
        if (err) {
            console.error('Erro ao buscar restaurantes:', err);
        } else {
            console.log(`Total de restaurantes: ${rows.length}`);
            rows.forEach(restaurant => {
                console.log(`- ${restaurant.name} (ID: ${restaurant.id})`);
            });
        }
    });

    // Verificar produtos
    console.log('\n=== PRODUTOS ===');
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            console.error('Erro ao buscar produtos:', err);
        } else {
            console.log(`Total de produtos: ${rows.length}`);
            rows.forEach(product => {
                console.log(`- ${product.title} (ID: ${product.id}, Restaurante: ${product.restaurant_id})`);
            });
        }
    });

    // Verificar categorias
    console.log('\n=== CATEGORIAS ===');
    db.all('SELECT * FROM categories', (err, rows) => {
        if (err) {
            console.error('Erro ao buscar categorias:', err);
        } else {
            console.log(`Total de categorias: ${rows.length}`);
            rows.forEach(category => {
                console.log(`- ${category.title} (ID: ${category.id})`);
            });
        }
    });

    // Verificar categorias de pedidos
    console.log('\n=== CATEGORIAS DE PEDIDOS ===');
    db.all('SELECT * FROM order_categories', (err, rows) => {
        if (err) {
            console.error('Erro ao buscar categorias de pedidos:', err);
        } else {
            console.log(`Total de categorias de pedidos: ${rows.length}`);
            rows.forEach(category => {
                console.log(`- ${category.name} (ID: ${category.id})`);
            });
        }
    });
}

checkData(); 