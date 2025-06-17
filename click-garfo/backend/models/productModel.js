const { db } = require('../database/database');

module.exports = {
    getAll(callback) {
        const sql = `
            SELECT p.*, c.title as category_name, r.name as restaurant_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN restaurants r ON p.restaurant_id = r.id
            ORDER BY p.created_at DESC
        `;
        db.all(sql, callback);
    },

    getById(id, callback) {
        const sql = `
            SELECT p.*, c.title as category_name, r.name as restaurant_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN restaurants r ON p.restaurant_id = r.id
            WHERE p.id = ?
        `;
        db.get(sql, [id], callback);
    },

    getPopular(callback) {
        const sql = `
            SELECT p.*, c.title as category_name, r.name as restaurant_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN restaurants r ON p.restaurant_id = r.id
            ORDER BY p.created_at DESC
            LIMIT 10
        `;
        db.all(sql, callback);
    },

    getSales(callback) {
        const sql = `
            SELECT p.*, c.title as category_name, r.name as restaurant_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN restaurants r ON p.restaurant_id = r.id
            WHERE p.price < (
                SELECT AVG(price) 
                FROM products 
                WHERE category_id = p.category_id
            )
            ORDER BY p.price ASC
            LIMIT 10
        `;
        db.all(sql, callback);
    },

    getByCategory(categoryId, callback) {
        const sql = `
            SELECT p.*, c.title as category_name, r.name as restaurant_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN restaurants r ON p.restaurant_id = r.id
            WHERE p.category_id = ?
            ORDER BY p.created_at DESC
        `;
        db.all(sql, [categoryId], callback);
    },

    getByRestaurant(restaurantId, callback) {
        const sql = `
            SELECT p.*, c.title as category_name, r.name as restaurant_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN restaurants r ON p.restaurant_id = r.id
            WHERE p.restaurant_id = ?
            ORDER BY p.created_at DESC
        `;
        db.all(sql, [restaurantId], callback);
    },

    create(product, callback) {

        let { title, subtitle, description, photo, price, category_id, restaurant_id } = product;
        const stmt = db.prepare("INSERT INTO products (title, subtitle, description, photo, price, category_id, restaurant_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
        
        switch (product.photo){
            case "CAFÉ":
                photo = "/Cafe&Cia.svg"
                break;
        }
            
        stmt.run([title, subtitle, description, photo, price, category_id, restaurant_id], function(err) {
            callback(err, this);
        });
        stmt.finalize();
    },

    deleteById(id, callback) {
        const stmt = db.prepare("DELETE FROM products WHERE id = ?");
        stmt.run([id], function(err) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, { changes: this.changes });
            }
        });
        stmt.finalize();
    },

    update(id, product, callback) {
        const { title, subtitle, description, photo, price, category_id, restaurant_id } = product;
        
        let sql = "UPDATE products SET ";
        const updates = [];
        const params = [];

        if (title) {
            updates.push("title = ?");
            params.push(title);
        }
        if (subtitle) {
            updates.push("subtitle = ?");
            params.push(subtitle);
        }
        if (description) {
            updates.push("description = ?");
            params.push(description);
        }
        if (photo) {
            updates.push("photo = ?");
            params.push(photo);
        }
        if (price) {
            updates.push("price = ?");
            params.push(price);
        }
        if (category_id) {
            updates.push("category_id = ?");
            params.push(category_id);
        }
        if (restaurant_id) {
            updates.push("restaurant_id = ?");
            params.push(restaurant_id);
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