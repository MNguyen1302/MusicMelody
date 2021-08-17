import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });

export const login = (user) => { return api.post('/auth/login', user) }

export const register = (user) => { return api.post('/auth/register', user) }
