import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });

export const getUser = (userId) => { return api.get(`/user/${userId}`) };

export const editProfile = (userId, formData, config) => { return api.patch(`/user/edit/${userId}`, formData, config) };

export const changePassword = (userId, formData) => { return api.patch(`/user/password/${userId}`, formData) }

export const getFavourite = (userId) => { return api.get(`/user/${userId}/getFavourite`) }