const Restaurant = require('../models/restaurantModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Certifique-se de importar o jsonwebtoken

// APENAS AQUI: Garanta que SECRET está definida no seu ambiente ou como um fallback
const SECRET = process.env.JWT_SECRET || 'seu-segredo-super-secreto'; 

module.exports = {
    getAllRestaurants(req, res) {
        Restaurant.getAll((err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    },

    getRestaurantById(req, res) {
        Restaurant.getById(req.params.id, (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!row) return res.status(400).json({ message: "Restaurant not found" });
            res.json(row);
        });
    },

    getPopularRestaurants(req, res) {
        Restaurant.getPopular((err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    },

    getRestaurantsByCategory(req, res) {
        Restaurant.getByCategory(req.params.categoryId, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    },

    // AQUI ESTÁ A CORREÇÃO PRINCIPAL:
    // Removido 'exports.' e ajustado o posicionamento da função dentro do objeto
    createRestaurant(req, res) { 
        const { name, phone, password, category_id } = req.body;

        // 1. Validação dos inputs
        if (!name || !phone || !password || !category_id) {
            return res.status(400).json({ message: "Nome, telefone, senha e ID da categoria são obrigatórios." });
        }

        // 2. Hash da senha
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error("Erro ao criptografar senha:", err);
                return res.status(500).json({ message: 'Erro ao criptografar senha.' });
            }

            // 3. Criar restaurante no banco de dados
            Restaurant.create({ name, phone, password: hashedPassword, category_id }, (err, result) => {
                if (err) {
                    console.error("Erro ao criar restaurante no DB:", err);
                    if (err.message && err.message.includes('SQLITE_CONSTRAINT: UNIQUE constraint failed')) {
                        return res.status(409).json({ message: "Um restaurante com este nome ou telefone já existe." });
                    }
                    return res.status(500).json({ message: "Erro interno do servidor ao criar restaurante." });
                }

                // 4. Gerar o token JWT (AGORA 'result' está no escopo correto)
                // Use 'name' ou outro identificador único do restaurante para o payload do token
                const token = jwt.sign({ id: result.lastID, name: name }, SECRET, { expiresIn: '1h' }); 

                // 5. Enviar a resposta de sucesso com a mensagem e o token
                console.log('Restaurante criado e token gerado. Enviando resposta...');
                return res.status(201).json({ 
                    message: "Restaurante criado com sucesso!", 
                    restaurantId: result.lastID, // Id do restaurante criado
                    token // O token JWT para o restaurante
                });
            }); // Fim do callback de Restaurant.create
        }); // Fim do callback de bcrypt.hash
    }, // <--- VÍRGULA AQUI para separar do próximo método no objeto

    deleteRestaurantById(req, res) {
        Restaurant.deleteById(req.params.id, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({ message: "Restaurant Deleted" });
        });
    },

    updateRestaurant(req, res) {
        const { name, phone, password, category_id, stars } = req.body;
        const { id } = req.params;

        if (!name && !phone && !password && !category_id && !stars) {
            return res.status(400).json({ message: "At least one field is required for update" });
        }

        const updateRestaurant = {
            name: name || undefined,
            phone: phone || undefined,
            password: password || undefined,
            category_id: category_id || undefined,
            stars: stars || undefined
        };

        if (password) {
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) return res.status(500).json({ message: 'Error encrypting password.' });
                updateRestaurant.password = hashedPassword;

                Restaurant.update(id, updateRestaurant, (err, result) => {
                    if (err) return res.status(500).json({ error: err.message });
                    if (result.changes === 0) {
                        return res.status(400).json({ message: "Restaurant not found or no fields updated" });
                    }
                    res.json({ message: "Restaurant updated", restaurantId: id });
                });
            });
        } else {
            Restaurant.update(id, updateRestaurant, (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                if (result.changes === 0) {
                    return res.status(400).json({ message: "Restaurant not found or no fields updated" });
                }
                res.json({ message: "Restaurant updated", restaurantId: id });
            });
        }
    },

    getRestaurantProducts(req, res) {
        Restaurant.getProducts(req.params.id, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    },

    getFavoriteRestaurants(req, res) {
        Restaurant.getFavorites(req.user.id, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    },

    toggleFavorite(req, res) {
        Restaurant.toggleFavorite(req.user.id, req.params.id, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: result.isFavorite ? "Restaurante adicionado aos favoritos" : "Restaurante removido dos favoritos" });
        });
    }
};