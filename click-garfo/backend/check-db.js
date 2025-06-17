const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

console.log('Verificando banco de dados...');

// Verificar se a tabela users existe
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", (err, row) => {
    if (err) {
        console.error('Erro ao verificar tabela users:', err);
        return;
    }
    
    if (!row) {
        console.log('Tabela users não existe!');
        return;
    }
    
    console.log('Tabela users existe!');
    
    // Verificar estrutura da tabela
    db.all("PRAGMA table_info(users)", (err, columns) => {
        if (err) {
            console.error('Erro ao verificar estrutura da tabela:', err);
            return;
        }
        
        console.log('Estrutura da tabela users:');
        columns.forEach(col => {
            console.log(`${col.name} (${col.type})`);
        });
        
        // Verificar se já existem usuários
        db.all("SELECT id, name, email, phone, password FROM users", (err, users) => {
            if (err) {
                console.error('Erro ao listar usuários:', err);
                return;
            }
            
            console.log('\nUsuários cadastrados:');
            users.forEach(user => {
                console.log(`ID: ${user.id}`);
                console.log(`Nome: ${user.name}`);
                console.log(`Email: ${user.email}`);
                console.log(`Telefone: ${user.phone}`);
                console.log(`Senha (hash): ${user.password}`);
                console.log('---');
            });
            
            db.close();
        });
    });
}); 