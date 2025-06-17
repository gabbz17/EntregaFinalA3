const OrderCategory = require('../models/orderCategoryModel');

module.exports = {
    getAllCategories(req, res) {
        OrderCategory.getAll((err, categories) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(categories);
        });
    },

    getCategoryById(req, res) {
        const { id } = req.params;
        OrderCategory.getById(id, (err, category) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!category) return res.status(404).json({ message: 'Categoria não encontrada' });
            res.json(category);
        });
    },

    createCategory(req, res) {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ message: "name é obrigatório" });
        }

        OrderCategory.create({ name, description }, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ 
                message: "Categoria criada com sucesso", 
                categoryId: result.id 
            });
        });
    },

    updateCategory(req, res) {
        const { id } = req.params;
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ message: "name é obrigatório" });
        }

        OrderCategory.update(id, { name, description }, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.changes === 0) {
                return res.status(404).json({ message: "Categoria não encontrada" });
            }
            res.json({ message: "Categoria atualizada com sucesso" });
        });
    },

    deleteCategory(req, res) {
        const { id } = req.params;
        OrderCategory.delete(id, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.changes === 0) {
                return res.status(404).json({ message: "Categoria não encontrada" });
            }
            res.json({ message: "Categoria excluída com sucesso" });
        });
    }
}; 