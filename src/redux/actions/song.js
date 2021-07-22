import * as types from '../types';
import * as apis from '../../apis/song';

export const getAllSongs = () => async (dispatch) => {
    try {
        const { data } = await apis.getAllSongs();
        dispatch({
            type: types.GET_ALL_SONGS,
            payload: data
        })
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