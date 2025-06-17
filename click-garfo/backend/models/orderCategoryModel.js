const { db } = require('../database/database');

class OrderCategory {
    static getAll(callback) {
        const sql = 'SELECT * FROM order_categories';
        db.all(sql, callback);
    }

    static getById(id, callback) {
        const sql = 'SELECT * FROM order_categories WHERE id = ?';
        db.get(sql, [id], callback);
    }

    static create(categoryData, callback) {
        const { name, description } = categoryData;
        const sql = 'INSERT INTO order_categories (name, description) VALUES (?, ?)';
        
        db.run(sql, [name, description], function(err) {
            if (err) return callback(err);
            callback(null, { id: this.lastID });
        });
    }

    static update(id, categoryData, callback) {
        const { name, description } = categoryData;
        const sql = 'UPDATE order_categories SET name = ?, description = ? WHERE id = ?';
        
        db.run(sql, [name, description, id], function(err) {
            if (err) return callback(err);
            callback(null, { changes: this.changes });
        });
    }

    static delete(id, callback) {
        const sql = 'DELETE FROM order_categories WHERE id = ?';
        db.run(sql, [id], function(err) {
            if (err) return callback(err);
            callback(null, { changes: this.changes });
        });
    }
}

module.exports = OrderCategory; 