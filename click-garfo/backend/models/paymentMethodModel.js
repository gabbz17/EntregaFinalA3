const { db } = require('../database/database');

class PaymentMethod {
    static getAll(callback) {
        const sql = 'SELECT * FROM payment_methods';
        db.all(sql, callback);
    }

    static getById(id, callback) {
        const sql = 'SELECT * FROM payment_methods WHERE id = ?';
        db.get(sql, [id], callback);
    }

    static create(methodData, callback) {
        const { name, description, icon } = methodData;
        const sql = 'INSERT INTO payment_methods (name, description, icon) VALUES (?, ?, ?)';
        
        db.run(sql, [name, description, icon], function(err) {
            if (err) return callback(err);
            callback(null, { id: this.lastID });
        });
    }

    static update(id, methodData, callback) {
        const { name, description, icon } = methodData;
        const sql = 'UPDATE payment_methods SET name = ?, description = ?, icon = ? WHERE id = ?';
        
        db.run(sql, [name, description, icon, id], function(err) {
            if (err) return callback(err);
            callback(null, { changes: this.changes });
        });
    }

    static delete(id, callback) {
        const sql = 'DELETE FROM payment_methods WHERE id = ?';
        db.run(sql, [id], function(err) {
            if (err) return callback(err);
            callback(null, { changes: this.changes });
        });
    }
}

module.exports = PaymentMethod; 