import * as types from '../types';

let initialState = {
    songs: [],
    trending: [],
    category: [],
    search: {},
    loading: false,
    error: null
}

const songs = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case types.TOGGLE_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.GET_ALL_SONGS: 
            return {
                ...state,
                songs: payload,
                loading: false
            }
        case types.GET_TOP_TRENDING: 
            return {
                ...state,
                trending: payload,
                loading: false
            }
        case types.GET_CATEGORY:
            return {
                ...state,
                category: payload,
                loading: false
            }
        default: 
            return state;
    }
}

export default songs;