const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const SECRET = 'key';

module.exports = {
    getAllUsers(req, res) {
        User.getAll((err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    },

    getUserById(req, res) {
        User.getById(req.params.id, (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!row) return res.status(400).json({ message: "User not found" });
            res.json(row);
        });
    },

    createUser(req, res) {
        console.log('Recebendo requisição de criação de usuário:', req.body);
        const { name, email, phone, password } = req.body;
        
        if (!name || !email || !phone || !password) {
            console.log('Campos obrigatórios faltando:', { name, email, phone, password });
            return res.status(400).json({ message: "name, email, phone, and password are required." });
        }

        // Primeiro, verificar se o e-mail já existe
        User.findByEmail(email, (err, existingUser) => {
            if (err) {
                console.error('Erro ao verificar e-mail:', err);
                return res.status(500).json({ message: "Erro ao verificar e-mail." });
            }

            if (existingUser) {
                console.log('E-mail já cadastrado:', email);
                return res.status(400).json({ message: "Este e-mail já está cadastrado. Por favor, faça login ou use outro e-mail." });
            }

            // Se o e-mail não existe, prosseguir com o cadastro
            console.log('Iniciando hash da senha...');
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error('Erro ao gerar hash da senha:', err);
                    return res.status(500).json({ message: 'Error encrypting password.' });
                }

                console.log('Hash da senha gerado com sucesso. Criando usuário...');
                User.create({ name, email, phone, password: hashedPassword }, (err, result) => {
                    if (err) {
                        console.error('Erro ao criar usuário:', err);
                        return res.status(500).json({ 
                            message: "Erro ao criar usuário. Tente novamente.",
                            error: err.message 
                        });
                    }
                    
                    console.log('Usuário criado com sucesso. Gerando token...');
                    // Gerar token após criar o usuário
                    const token = jwt.sign({ id: result.lastID, email }, SECRET, { expiresIn: '1h' });
                    
                    console.log('Token gerado. Enviando resposta...');
                    res.status(201).json({ 
                        message: "Usuário criado com sucesso!", 
                        userId: result.lastID,
                        token 
                    });
                });
            });
        });
    },

    deleteUserById(req, res) {
        User.deleteById(req.params.id, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "User Deleted" });
        });
    },

    updateUser(req, res) {
        const { name, email, phone, password } = req.body;
        const { id } = req.params;

        if (!name && !email && !phone && !password) {
            return res.status(400).json({ message: "At least one field is required for update" });
        }

        const updateUser = {
            name: name || undefined,
            email: email || undefined,
            phone: phone || undefined
        };

        if (password) {
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) return res.status(500).json({ message: 'Error encrypting password.' });

                updateUser.password = hashedPassword;
                
                User.update(id, updateUser, (err, result) => {
                    if (err) return res.status(500).json({ error: err.message });
                    if(result.changes === 0) {
                        return res.status(400).json({ message: "User not found or no fields updated" });
                    }
                    res.json({ message: "User updated", userId: id });
                });
            })
        } else {
            User.update(id, updateUser, (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                if (result.changes === 0) {
                    return res.status(400).json({ message: "User not found or no fields updated" });
                }
                res.json({ message: "User updated", userId: id });
            });
        }

    },

    loginUser(req, res) {
        console.log('Recebendo requisição de login:', req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            console.log('Campos obrigatórios faltando:', { email, password });
            return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
        }

        console.log('Buscando usuário pelo e-mail:', email);
        User.findByEmail(email, (err, user) => {
            if (err) {
                console.error('Erro ao buscar usuário:', err);
                return res.status(500).json({ message: 'Erro interno do servidor.' });
            }
            
            if (!user) {
                console.log('Usuário não encontrado:', email);
                return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
            }

            console.log('Usuário encontrado. Verificando senha...');
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.error('Erro ao comparar senhas:', err);
                    return res.status(500).json({ message: 'Erro interno do servidor.' });
                }

                if (result) {
                    console.log('Senha correta. Gerando token...');
                    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
                    console.log('Token gerado. Enviando resposta...');
                    return res.json({ 
                        message: 'Login realizado com sucesso!',
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    });
                } else {
                    console.log('Senha incorreta para o usuário:', email);
                    return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
                }
            });
        });
    }
};