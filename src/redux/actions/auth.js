import * as types from '../types';
import apis from '../../apis/auth';

export default {
    login: (user, history) => async (dispatch) => {
        try {
            const { data } = await apis.login(user);
    
            dispatch({
                type: types.AUTH_SUCCESS,
                payload: data
            })
            history.push('/');
        } catch (error) {
            console.log(error);
            dispatch({
                type: types.AUTH_FAIL
            })
        }
    },
    register: (user, history) => async (dispatch) => {
        try {
            const { data } = await apis.register(user);
    
            dispatch({
                type: types.REGISTER,
                payload: data
            })
            history.push('/auth/login');
        } catch (error) {
            dispatch({
                type: types.AUTH_FAIL
            })
        }
    },
    loginGoogle: (tokenId) => async (dispatch) => {
        try {
            const { data } = await apis.loginGoogle(tokenId);

            dispatch({
                type: types.AUTH_GOOGLE_SUCCESS,
                payload: data
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: types.AUTH_FAIL
            })
        }
    }
}