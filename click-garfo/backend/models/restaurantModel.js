const { db } = require('../database/database');

module.exports = {
    getAll(callback) {
        const sql = `
            SELECT r.*, c.title as category_name, c.photo as category_photo,
                   (SELECT COUNT(*) FROM products WHERE restaurant_id = r.id) as products_count,
                   (SELECT AVG(rating) FROM restaurant_ratings WHERE restaurant_id = r.id) as average_rating
            FROM restaurants r
            LEFT JOIN categories c ON r.category_id = c.id
            ORDER BY r.stars DESC, average_rating DESC
        `;
        db.all(sql, callback);
    },

    getById(id, callback) {
        const sql = `
            SELECT r.*, c.title as category_name, c.photo as category_photo,
                   (SELECT COUNT(*) FROM products WHERE restaurant_id = r.id) as products_count,
                   (SELECT AVG(rating) FROM restaurant_ratings WHERE restaurant_id = r.id) as average_rating
            FROM restaurants r
            LEFT JOIN categories c ON r.category_id = c.id
            WHERE r.id = ?
        `;
        db.get(sql, [id], callback);
    },

    getPopular(callback) {
        const sql = `
            SELECT r.*, c.title as category_name, c.photo as category_photo,
                   (SELECT COUNT(*) FROM products WHERE restaurant_id = r.id) as products_count,
                   (SELECT AVG(rating) FROM restaurant_ratings WHERE restaurant_id = r.id) as average_rating
            FROM restaurants r
            LEFT JOIN categories c ON r.category_id = c.id
            ORDER BY r.stars DESC, average_rating DESC
            LIMIT 10
        `;
        db.all(sql, callback);
    },

    getByCategory(categoryId, callback) {
        const sql = `
            SELECT r.*, c.title as category_name, c.photo as category_photo,
                   (SELECT COUNT(*) FROM products WHERE restaurant_id = r.id) as products_count,
                   (SELECT AVG(rating) FROM restaurant_ratings WHERE restaurant_id = r.id) as average_rating
            FROM restaurants r
            LEFT JOIN categories c ON r.category_id = c.id
            WHERE r.category_id = ?
            ORDER BY r.stars DESC, average_rating DESC
        `;
        db.all(sql, [categoryId], callback);
    },

    create(restaurant, callback) {
        const { name, phone, password, category_id } = restaurant;
        const stmt = db.prepare("INSERT INTO restaurants (name, phone, password, category_id) VALUES (?, ?, ?, ?)");
        stmt.run([name, phone, password, category_id], function(err) {
            callback(err, this);
        });
        stmt.finalize();
    },

    deleteById(id, callback) {
        const stmt = db.prepare("DELETE FROM restaurants WHERE id = ?");
        stmt.run([id], function(err) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, { changes: this.changes });
            }
        });
        stmt.finalize();
    },

    update(id, restaurant, callback) {
        const { name, phone, password, category_id, stars } = restaurant;
        
        let sql = "UPDATE restaurants SET ";
        const updates = [];
        const params = [];

        if (name) {
            updates.push("name = ?");
            params.push(name);
        }
        if (phone) {
            updates.push("phone = ?");
            params.push(phone);
        }
        if (password) {
            updates.push("password = ?");
            params.push(password);
        }
        if (category_id) {
            updates.push("category_id = ?");
            params.push(category_id);
        }
        if (stars) {
            updates.push("stars = ?");
            params.push(stars);
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

    getProducts(restaurantId, callback) {
        const sql = `
            SELECT p.*, c.title as category_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.restaurant_id = ?
        `;
        db.all(sql, [restaurantId], callback);
    },

    getFavorites(userId, callback) {
        const sql = `
            SELECT r.*, c.title as category_name,
                   (SELECT COUNT(*) FROM products WHERE restaurant_id = r.id) as products_count,
                   (SELECT AVG(rating) FROM restaurant_ratings WHERE restaurant_id = r.id) as average_rating
            FROM restaurants r
            LEFT JOIN categories c ON r.category_id = c.id
            INNER JOIN favorites f ON r.id = f.restaurant_id
            WHERE f.user_id = ?
        `;
        db.all(sql, [userId], callback);
    },

    toggleFavorite(userId, restaurantId, callback) {
        // Primeiro, verifica se já é favorito
        const checkSql = 'SELECT * FROM favorites WHERE user_id = ? AND restaurant_id = ?';
        db.get(checkSql, [userId, restaurantId], (err, row) => {
            if (err) return callback(err);

            if (row) {
                // Se já é favorito, remove
                const deleteSql = 'DELETE FROM favorites WHERE user_id = ? AND restaurant_id = ?';
                db.run(deleteSql, [userId, restaurantId], function(err) {
                    if (err) return callback(err);
                    callback(null, { isFavorite: false });
                });
            } else {
                // Se não é favorito, adiciona
                const insertSql = 'INSERT INTO favorites (user_id, restaurant_id) VALUES (?, ?)';
                db.run(insertSql, [userId, restaurantId], function(err) {
                    if (err) return callback(err);
                    callback(null, { isFavorite: true });
                });
            }
        });
    }
}