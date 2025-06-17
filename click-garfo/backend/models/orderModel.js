const { db } = require("../database/database");

class Order {
    static create(orderData, callback) {
        const { userId, restaurantId, totalPrice, paymentMethod, categoryId } = orderData;
        const sql = `INSERT INTO orders (user_id, restaurant_id, status, total_price, payment_method, category_id) 
                    VALUES (?, ?, 'pendente', ?, ?, ?)`;
        
        db.run(sql, [userId, restaurantId, totalPrice, paymentMethod, categoryId], function(err) {
            if (err) return callback(err);
            callback(null, { id: this.lastID });
        });
    }

    static getById(id, callback) {
        const sql = `SELECT o.*, oc.name as category_name, oc.description as category_description 
                    FROM orders o 
                    LEFT JOIN order_categories oc ON o.category_id = oc.id 
                    WHERE o.id = ?`;
        
        db.get(sql, [id], callback);
    }

    static getUserOrders(userId, callback) {
        const sql = `SELECT o.*, oc.name as category_name, oc.description as category_description 
                    FROM orders o 
                    LEFT JOIN order_categories oc ON o.category_id = oc.id 
                    WHERE o.user_id = ? 
                    ORDER BY o.created_at DESC`;
        
        db.all(sql, [userId], callback);
    }

    static getRestaurantOrders(restaurantId, callback) {
        const sql = `SELECT o.*, oc.name as category_name, oc.description as category_description 
                    FROM orders o 
                    LEFT JOIN order_categories oc ON o.category_id = oc.id 
                    WHERE o.restaurant_id = ? 
                    ORDER BY o.created_at DESC`;
        
        db.all(sql, [restaurantId], callback);
    }

    static updateStatus(id, status, callback) {
        const sql = 'UPDATE orders SET status = ? WHERE id = ?';
        db.run(sql, [status, id], function(err) {
            if (err) return callback(err);
            callback(null, { changes: this.changes });
        });
    }

    static delete(id, callback) {
        const sql = 'DELETE FROM orders WHERE id = ?';
        db.run(sql, [id], function(err) {
            if (err) return callback(err);
            callback(null, { changes: this.changes });
        });
    }
}

module.exports = Order;