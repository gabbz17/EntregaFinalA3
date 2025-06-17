import api from './api';

export const authService = {
    async login(email, password) {
        try {
            const response = await api.post('/users/login', { email, password });
            const { token } = response.data;
            if (token) {
                localStorage.setItem('token', token);
            }
            return response.data;
        } catch (error) {
            console.error('Erro no login:', error);
            throw error;
        }
    },

    async register(userData) {
        try {
            const response = await api.post('/users/create', userData);
            const { token } = response.data;
            if (token) {
                localStorage.setItem('token', token);
            }
            return response.data;
        } catch (error) {
            console.error('Erro no registro:', error);
            throw error;
        }
    },

    logout() {
        localStorage.removeItem('token');
    },

    isAuthenticated() {
        return !!localStorage.getItem('token');
    }
}; 