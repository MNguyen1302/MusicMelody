import * as types from '../types';
import * as apis from '../../apis/comment';

export const postComment = (content, userId, slug) => async (dispatch) => {
    try {
        const { data } = await apis.postComment(content, userId, slug);

        dispatch({
            type: types.POST_COMMENT,
            payload: data
        })

    } catch(error) {
        console.log(error)
    }
}
