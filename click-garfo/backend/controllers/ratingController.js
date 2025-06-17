const Rating = require('../models/ratingModel');

module.exports = {
    getRestaurantRatings(req, res) {
        const { restaurantId } = req.params;
        
        Rating.getByRestaurantId(restaurantId, (err, ratings) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(ratings);
        });
    },

    getUserRatings(req, res) {
        Rating.getByUserId(req.userId, (err, ratings) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(ratings);
        });
    },

    createRating(req, res) {
        const { restaurantId, rating, comment } = req.body;

        if (!restaurantId || !rating) {
            return res.status(400).json({ message: "restaurantId e rating são obrigatórios" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "rating deve estar entre 1 e 5" });
        }

        Rating.create({
            userId: req.userId,
            restaurantId,
            rating,
            comment: comment || ''
        }, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ 
                message: "Avaliação criada com sucesso", 
                ratingId: result.id 
            });
        });
    },

    updateRating(req, res) {
        const { id } = req.params;
        const { rating, comment } = req.body;

        if (!rating) {
            return res.status(400).json({ message: "rating é obrigatório" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "rating deve estar entre 1 e 5" });
        }

        Rating.update(id, { stars: rating, comment: comment || '' }, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.changes === 0) {
                return res.status(404).json({ message: "Avaliação não encontrada" });
            }
            res.json({ message: "Avaliação atualizada" });
        });
    },

    deleteRating(req, res) {
        const { id } = req.params;

        Rating.delete(id, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.changes === 0) {
                return res.status(404).json({ message: "Avaliação não encontrada" });
            }
            res.json({ message: "Avaliação excluída" });
        });
    }
}; 