import * as types from '../types';
import cookies from 'js-cookie';

let initialState = {
    token: localStorage.getItem('userToken'),
    isAuthenticated: false,
    loading: false,
    errors: null
}

const auth = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case types.AUTH_SUCCESS: 
            localStorage.setItem('userToken', payload.token)
            cookies.set('userId', payload.user._id);

            return {
                ...state,
                isAuthenticated: true,
                loading: true,
                ...payload
            }
        case types.AUTH_GOOGLE_SUCCESS:
            cookies.set('userId', payload._id);

            return {
                ...state,
                isAuthenticated: true,
                ...payload
            }
        case types.AUTH_FAIL: 
            localStorage.removeItem('userToken');
            cookies.remove('userId');

            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                errors: 'Not Authenticated'
            }
        case types.REGISTER:
            return {
                ...state
            }
        default: 
            return state;
    }
}

export default auth;