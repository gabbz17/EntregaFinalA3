const Product = require('../models/productModel');

module.exports = {
    getAllProducts(req, res) {
        Product.getAll((err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    },

    getProductById(req, res) {
        Product.getById(req.params.id, (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!row) return res.status(400).json({ message: "Product not found" });
            res.json(row);
        });
    },

    getPopularProducts(req, res) {
        Product.getPopular((err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    },

    getSalesProducts(req, res) {
        Product.getSales((err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    },

    getProductsByCategory(req, res) {
        Product.getByCategory(req.params.categoryId, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    },

    getProductsByRestaurant(req, res) {
        Product.getByRestaurant(req.params.restaurantId, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    },

    createProduct(req, res) {
        const { title, subtitle, description, photo, price, category_id, restaurant_id } = req.body;
        if (!title || !price || !category_id || !restaurant_id) {
            return res.status(400).json({ message: "title, price, category_id and restaurant_id are required." });
        }

        Product.create({ title, subtitle, description, photo, price, category_id, restaurant_id }, (err, result) => {
            if (err) return res.status(500).json({ message: "Error creating Product" });
            res.status(201).json({ message: "Product Created", productId: result.lastID });
        });
    },

    deleteProductById(req, res) {
        Product.deleteById(req.params.id, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({ message: "Product Deleted" });
        });
    },

    updateProduct(req, res) {
        const { title, subtitle, description, photo, price, category_id, restaurant_id } = req.body;
        const { id } = req.params;

        if (!title && !subtitle && !description && !photo && !price && !category_id && !restaurant_id) {
            return res.status(400).json({ message: "At least one field is required for update" });
        }

        const updateProduct = {
            title: title || undefined,
            subtitle: subtitle || undefined,
            description: description || undefined,
            photo: photo || undefined,
            price: price || undefined,
            category_id: category_id || undefined,
            restaurant_id: restaurant_id || undefined
        };

        Product.update(id, updateProduct, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.changes === 0) {
                return res.status(400).json({ message: "Product not found or no fields updated" });
            }
            res.json({ message: "Product updated", productId: id });
        });
    }
}; 