const { db } = require('../database/database');

module.exports = {
    getByRestaurantId(restaurantId, callback) {
        db.all(`
            SELECT r.*, u.name as user_name 
            FROM restaurant_ratings r
            JOIN users u ON r.user_id = u.id
            WHERE r.restaurant_id = ?
            ORDER BY r.created_at DESC
        `, [restaurantId], callback);
    },

    getByUserId(userId, callback) {
        db.all(`
            SELECT r.*, res.name as restaurant_name 
            FROM restaurant_ratings r
            JOIN restaurants res ON r.restaurant_id = res.id
            WHERE r.user_id = ?
            ORDER BY r.created_at DESC
        `, [userId], callback);
    },

    create(rating, callback) {
        const { userId, restaurantId, rating: stars, comment } = rating;
        const stmt = db.prepare(`
            INSERT INTO restaurant_ratings (user_id, restaurant_id, rating, comment) 
            VALUES (?, ?, ?, ?)
        `);
        stmt.run([userId, restaurantId, stars, comment], function(err) {
            if (err) {
                callback(err, null);
            } else {
                // Atualizar a média de avaliações do restaurante
                db.get(`
                    SELECT AVG(rating) as average_rating 
                    FROM restaurant_ratings 
                    WHERE restaurant_id = ?
                `, [restaurantId], (err, result) => {
                    if (err) {
                        callback(err, null);
                    } else {
                        db.run(`
                            UPDATE restaurants 
                            SET stars = ? 
                            WHERE id = ?
                        `, [result.average_rating, restaurantId], (err) => {
                            callback(err, { id: this.lastID });
                        });
                    }
                });
            }
        });
        stmt.finalize();
    },

    update(id, rating, callback) {
        const { stars, comment } = rating;
        const stmt = db.prepare(`
            UPDATE restaurant_ratings 
            SET rating = ?, comment = ? 
            WHERE id = ?
        `);
        stmt.run([stars, comment, id], function(err) {
            if (err) {
                callback(err, null);
            } else {
                // Atualizar a média de avaliações do restaurante
                db.get(`
                    SELECT restaurant_id, AVG(rating) as average_rating 
                    FROM restaurant_ratings 
                    WHERE restaurant_id = (
                        SELECT restaurant_id 
                        FROM restaurant_ratings 
                        WHERE id = ?
                    )
                `, [id], (err, result) => {
                    if (err) {
                        callback(err, null);
                    } else {
                        db.run(`
                            UPDATE restaurants 
                            SET stars = ? 
                            WHERE id = ?
                        `, [result.average_rating, result.restaurant_id], (err) => {
                            callback(err, { changes: this.changes });
                        });
                    }
                });
            }
        });
        stmt.finalize();
    },

    delete(id, callback) {
        const stmt = db.prepare('DELETE FROM restaurant_ratings WHERE id = ?');
        stmt.run([id], function(err) {
            if (err) {
                callback(err, null);
            } else {
                // Atualizar a média de avaliações do restaurante
                db.get(`
                    SELECT restaurant_id, AVG(rating) as average_rating 
                    FROM restaurant_ratings 
                    WHERE restaurant_id = (
                        SELECT restaurant_id 
                        FROM restaurant_ratings 
                        WHERE id = ?
                    )
                `, [id], (err, result) => {
                    if (err) {
                        callback(err, null);
                    } else {
                        db.run(`
                            UPDATE restaurants 
                            SET stars = ? 
                            WHERE id = ?
                        `, [result.average_rating, result.restaurant_id], (err) => {
                            callback(err, { changes: this.changes });
                        });
                    }
                });
            }
        });
        stmt.finalize();
    }
}; 