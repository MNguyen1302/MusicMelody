import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });

export const getAllSongs = () => { return api.get('/song') }

export const getTopSong = () => { return api.get('/song/top/trending') }

export const getSong = (slug) => { return api.get(`/song/${slug}`) }

export const likeSong = (slug, userId) => { return api.patch(`/song/${slug}/like`, {userId}) }

export const getCategory = (genre) => { return api.get(`/song/genre/${genre}`) }

export const editSong = (slug, formData, config) => {
    return api.patch(`/admin/edit/${slug}`, formData, config);
}

export const createSong = (formData, config) => {
    return api.post('/admin/create/song', formData, config);
}

export const deleteSong = (id) => { return api.delete(`/admin/delete/${id}`) }

export const postComment = (content, userId, slug) => { return api.post(`/comment/${slug}`, {content, userId}) }
