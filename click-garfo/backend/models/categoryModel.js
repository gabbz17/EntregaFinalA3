const { db } = require('../database/database');

module.exports = {
    getAll(callback) {
        const sql = `
            SELECT * FROM categories
            ORDER BY title ASC
        `;
        db.all(sql, callback);
    },

    getById(id, callback) {
        const sql = `
            SELECT * FROM categories
            WHERE id = ?
        `;
        db.get(sql, [id], callback);
    },

    create(category, callback) {
        const { title, photo } = category;
        const stmt = db.prepare("INSERT INTO categories (title, photo) VALUES (?, ?)");
        stmt.run([title, photo], function(err) {
            callback(err, this);
        });
        stmt.finalize();
    },

    update(id, category, callback) {
        const { title, photo } = category;
        
        let sql = "UPDATE categories SET ";
        const updates = [];
        const params = [];

        if (title) {
            updates.push("title = ?");
            params.push(title);
        }
        if (photo) {
            updates.push("photo = ?");
            params.push(photo);
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
    },

    deleteById(id, callback) {
        const stmt = db.prepare("DELETE FROM categories WHERE id = ?");
        stmt.run([id], function(err) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, { changes: this.changes });
            }
        });
        stmt.finalize();
    }
}; 