import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });

export const postComment = (content, userId, slug) => { return api.post(`/comment/${slug}`, {content, userId}) }

