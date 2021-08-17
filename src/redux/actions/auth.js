import * as types from '../types';
import * as apis from '../../apis/auth';

export const login = (user) => async (dispatch) => {
    try {
        const { data } = await apis.login(user);

        dispatch({
            type: types.AUTH_SUCCESS,
            payload: data
        })
        window.location.reload();
    } catch (error) {
        dispatch({
            type: types.AUTH_FAIL
        })
    }
}
export const register = (user, history) => async (dispatch) => {
    try {
        const { data } = await apis.register(user);

        dispatch({
            type: types.AUTH_SUCCESS,
            payload: data
        })
        history.push('/auth/login');
    } catch (error) {
        dispatch({
            type: types.AUTH_FAIL
        })
    }
}