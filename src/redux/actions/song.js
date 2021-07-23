import * as types from '../types';
import * as apis from '../../apis/song';

export const getAllSongs = () => async (dispatch) => {
    try {
        const { data } = await apis.getAllSongs();

        dispatch({
            type: types.GET_ALL_SONGS,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
}
export const getTopSong = () => async (dispatch) => {
    try {
        const { data } = await apis.getTopSong();

        dispatch({
            type: types.GET_TOP_TRENDING,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
}
export const getSong = (slug) => async (dispatch) => {
    try {
        const { data } = await apis.getSong(slug);

        dispatch({
            type: types.GET_SONG,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
}
export const likeSong = (slug, userId) => async (dispatch) => {
    try {
        const { data } = await apis.likeSong(slug, userId);

        dispatch({
            type: types.LIKE_SONG,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
}
export const getCategory = (genre) => async (dispatch) => {
    try {
        const { data } = await apis.getCategory(genre);

        dispatch({
            type: types.GET_CATEGORY,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
}
export const editSong = (name, artist, composer, type, image, audio, lyric, slug) => async (dispatch) => {
    try {
        const formData = new FormData();

        formData.append('name', name);
        formData.append('artist', artist);
        formData.append('composer', composer);
        formData.append('type', type);
        formData.append('image', image);
        formData.append('audio', audio);
        formData.append('lyric', lyric);

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await apis.editSong(slug, formData, config);
        dispatch({
            type: types.EDIT_SONG,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
}

export const createSong = (name, artist, composer, type, image, audio, lyric, id) => async (dispatch) => {
    try {
        const formData = new FormData();

        formData.append('name', name);
        formData.append('artist', artist);
        formData.append('composer', composer);
        formData.append('type', type);
        formData.append('image', image);
        formData.append('audio', audio);
        formData.append('lyric', lyric);
        formData.append('id', id);

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await apis.createSong(formData, config);

        dispatch({
            type: types.CREATE_SONG,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
}
export const deleteSong = (id) => async (dispatch) => {
    try {
        const { data } = await apis.deleteSong(id);
        console.log(data);
        dispatch({
            type: types.DELETE_SONG,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
}

export const postComment = (content, userId, slug, setFormData) => async (dispatch) => {
    try {
        const { data } = await apis.postComment(content, userId, slug);
        dispatch({
            type: types.POST_COMMENT,
            payload: data
        })
        
        setFormData({
            content: ''
        })
    } catch(error) {
        console.log(error)
    }
}