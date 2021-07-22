import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });

export const getUser = (userId) => { return api.get(`/user/${userId}`) };
