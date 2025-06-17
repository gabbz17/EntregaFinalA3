const { db } = require('../database/database');

module.exports = {
    getByUserId(userId, callback) {
        db.all(`
            SELECT c.*, p.title, p.price, p.photo 
            FROM carts c 
            JOIN products p ON c.product_id = p.id 
            WHERE c.user_id = ? AND c.order_id IS NULL
        `, [userId], callback);
    },

    addItem(userId, productId, quantity, callback) {
        const stmt = db.prepare(`
            INSERT INTO carts (user_id, product_id, quantity) 
            VALUES (?, ?, ?)
        `);
        stmt.run([userId, productId, quantity], function(err) {
            callback(err, this);
        });
        stmt.finalize();
    },

    updateQuantity(cartId, quantity, callback) {
        const stmt = db.prepare(`
            UPDATE carts 
            SET quantity = ? 
            WHERE id = ?
        `);
        stmt.run([quantity, cartId], function(err) {
            callback(err, this);
        });
        stmt.finalize();
    },

    removeItem(cartId, callback) {
        const stmt = db.prepare('DELETE FROM carts WHERE id = ?');
        stmt.run([cartId], function(err) {
            callback(err, this);
        });
        stmt.finalize();
    },

    clearCart(userId, callback) {
        const stmt = db.prepare('DELETE FROM carts WHERE user_id = ? AND order_id IS NULL');
        stmt.run([userId], function(err) {
            callback(err, this);
        });
        stmt.finalize();
    },

    updateCartWithOrder(userId, orderId, callback) {
        const stmt = db.prepare(`
            UPDATE carts 
            SET order_id = ? 
            WHERE user_id = ? AND order_id IS NULL
        `);
        stmt.run([orderId, userId], function(err) {
            callback(err, this);
        });
        stmt.finalize();
    }
}; 