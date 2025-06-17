const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

console.log('Verificando todas as tabelas do banco de dados...');

// Lista de tabelas para verificar
const tables = [
    'users',
    'categories',
    'order_categories',
    'restaurants',
    'products',
    'orders',
    'carts',
    'restaurant_ratings',
    'payment_methods'
];

// Função para verificar uma tabela específica
function checkTable(tableName) {
    return new Promise((resolve, reject) => {
        console.log(`\nVerificando tabela ${tableName}...`);
        
        // Verificar se a tabela existe
        db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`, (err, row) => {
            if (err) {
                console.error(`Erro ao verificar tabela ${tableName}:`, err);
                reject(err);
                return;
            }
            
            if (!row) {
                console.log(`Tabela ${tableName} não existe!`);
                resolve();
                return;
            }
            
            console.log(`Tabela ${tableName} existe!`);
            
            // Verificar estrutura da tabela
            db.all(`PRAGMA table_info(${tableName})`, (err, columns) => {
                if (err) {
                    console.error(`Erro ao verificar estrutura da tabela ${tableName}:`, err);
                    reject(err);
                    return;
                }
                
                console.log(`Estrutura da tabela ${tableName}:`);
                columns.forEach(col => {
                    console.log(`${col.name} (${col.type})`);
                });
                
                // Verificar dados da tabela
                db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
                    if (err) {
                        console.error(`Erro ao listar dados da tabela ${tableName}:`, err);
                        reject(err);
                        return;
                    }
                    
                    console.log(`\nDados da tabela ${tableName}:`);
                    if (rows.length === 0) {
                        console.log('Nenhum dado encontrado!');
                    } else {
                        rows.forEach(row => {
                            console.log(JSON.stringify(row, null, 2));
                            console.log('---');
                        });
                    }
                    
                    resolve();
                });
            });
        });
    });
}

// Verificar todas as tabelas em sequência
async function checkAllTables() {
    try {
        for (const table of tables) {
            await checkTable(table);
        }
        console.log('\nVerificação concluída!');
        db.close();
    } catch (error) {
        console.error('Erro durante a verificação:', error);
        db.close();
    }
}

checkAllTables(); 