const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const email = 'josefelipegerez@gmail.com';
const password = '12345678';

console.log('Testando login...');
console.log('Email:', email);
console.log('Senha:', password);

db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
        console.error('Erro ao buscar usuário:', err);
        return;
    }

    if (!user) {
        console.log('Usuário não encontrado');
        return;
    }

    console.log('Usuário encontrado:');
    console.log('ID:', user.id);
    console.log('Nome:', user.name);
    console.log('Email:', user.email);
    console.log('Senha (hash):', user.password);

    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            console.error('Erro ao comparar senhas:', err);
            return;
        }

        console.log('\nResultado da comparação:', result);
        console.log('Senha correta?', result ? 'Sim' : 'Não');

        db.close();
    });
}); 