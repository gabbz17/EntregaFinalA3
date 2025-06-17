const PaymentMethod = require('../models/paymentMethodModel');

module.exports = {
    getAllMethods(req, res) {
        PaymentMethod.getAll((err, methods) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(methods);
        });
    },

    getMethodById(req, res) {
        const { id } = req.params;
        PaymentMethod.getById(id, (err, method) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!method) return res.status(404).json({ message: 'Método de pagamento não encontrado' });
            res.json(method);
        });
    },

    createMethod(req, res) {
        const { name, description, icon } = req.body;

        if (!name) {
            return res.status(400).json({ message: "name é obrigatório" });
        }

        PaymentMethod.create({ name, description, icon }, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ 
                message: "Método de pagamento criado com sucesso", 
                methodId: result.id 
            });
        });
    },

    updateMethod(req, res) {
        const { id } = req.params;
        const { name, description, icon } = req.body;

        if (!name) {
            return res.status(400).json({ message: "name é obrigatório" });
        }

        PaymentMethod.update(id, { name, description, icon }, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.changes === 0) {
                return res.status(404).json({ message: "Método de pagamento não encontrado" });
            }
            res.json({ message: "Método de pagamento atualizado com sucesso" });
        });
    },

    deleteMethod(req, res) {
        const { id } = req.params;
        PaymentMethod.delete(id, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.changes === 0) {
                return res.status(404).json({ message: "Método de pagamento não encontrado" });
            }
            res.json({ message: "Método de pagamento excluído com sucesso" });
        });
    }
}; 