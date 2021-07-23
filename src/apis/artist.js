import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });

export const getAllArtist = () => { return api.get('/artist') };

export const getArtist = (slug) => { return api.get(`/artist/${slug}`) }

export const followArtist = (slug, userId) => { return api.patch(`/artist/${slug}/follow`, {userId}) }

export const createArtist = (formData, config) => {
    return api.post('/admin/create/artist', formData, config);
}