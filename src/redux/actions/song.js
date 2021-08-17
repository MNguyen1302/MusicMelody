import * as types from '../types';
import apis from '../../apis/song';

export default {
    getSong: (slug) => async (dispatch) => {
        try {
            const { data } = await apis.getSong(slug);
    
            dispatch({
                type: types.GET_SONG,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    },
    likeSong: (slug, userId) => async (dispatch) => {
        try {
            const { data } = await apis.likeSong(slug, userId);
    
            dispatch({
                type: types.LIKE_SONG,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    },
    postComment: (content, userId, slug, setFormData) => async (dispatch) => {
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
}