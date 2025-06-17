const { db } = require('../database/database');

module.exports = {
    getAll(callback) {
        db.all("SELECT * FROM users", callback);
    },

    getById(id, callback) {
        db.get("SELECT * FROM users WHERE id = ?", [id], callback);
    },

    findByEmail: (email, callback) => {
        db.get('SELECT * FROM users WHERE email = ?', [email], callback);
    },

    create(user, callback) {
        console.log('Modelo: Iniciando criação de usuário:', user);
        const { name, email, phone, password } = user;
        
        const sql = "INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)";
        const params = [name, email, phone, password];
        
        console.log('Modelo: Executando SQL:', sql);
        console.log('Modelo: Parâmetros:', params);
        
        db.run(sql, params, function(err) {
            if (err) {
                console.error('Modelo: Erro ao criar usuário:', err);
                callback(err, null);
            } else {
                console.log('Modelo: Usuário criado com sucesso. ID:', this.lastID);
                callback(null, this);
            }
        });
    },

    deleteById(id, callback) {
        db.run("DELETE FROM users WHERE id = ?",
            [id],
            function(err) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, { changes: this.changes });
                }
            }
        );
    },

    update(id, user, callback) {
        const { name, email, phone, password } = user;
        
        let sql = "UPDATE users SET ";
        const updates = [];
        const params = [];

        if (name) {
            updates.push("name = ?");
            params.push(name);
        }
        if (email) {
            updates.push("email = ?");
            params.push(email);
        }
        if (phone) {
            updates.push("phone = ?");
            params.push(phone);
        }
        if (password) {
            updates.push("password = ?");
            params.push(password);
        }

        if (updates.length === 0) {
            return callback(new Error("No fields to update"), null);
        }

        sql += updates.join(", ") + " WHERE id = ?";
        params.push(id);

        db.run(sql, params, function(err) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, { changes: this.changes });
            }
        });
    }
};