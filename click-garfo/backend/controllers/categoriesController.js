const Category = require('../models/categoryModel');

module.exports = {
    getAllCategories(req, res) {
        Category.getAll((err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    },

    getCategoryById(req, res) {
        Category.getById(req.params.id, (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!row) return res.status(404).json({ message: "Category not found" });
            res.json(row);
        });
    },

    createCategory(req, res) {
        const { title, photo } = req.body;
        if (!title) {
            return res.status(400).json({ message: "title is required" });
        }

        Category.create({ title, photo }, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "Category created", categoryId: result.lastID });
        });
    },

    updateCategory(req, res) {
        const { title, photo } = req.body;
        const { id } = req.params;

        if (!title && !photo) {
            return res.status(400).json({ message: "At least one field is required for update" });
        }

        const updateCategory = {
            title: title || undefined,
            photo: photo || undefined
        };

        Category.update(id, updateCategory, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.changes === 0) {
                return res.status(404).json({ message: "Category not found or no fields updated" });
            }
            res.json({ message: "Category updated", categoryId: id });
        });
    },

    deleteCategoryById(req, res) {
        Category.deleteById(req.params.id, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({ message: "Category deleted" });
        });
    }
}; 