import * as types from '../types';

let initialState = {
    songs: [],
    song: {},
    loading: false,
    error: null
}

const admin = (state = initialState, action) => {
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
        case types.GET_SONG: 
            return {
                ...state,
                song: payload.song,
                loading: false
            }
        case types.CREATE_SONG: 
            return {
                ...state,
                songs: [...state.songs, payload],
                loading: true
            }
        case types.DELETE_SONG:
            return {
                ...state
            }
        case types.EDIT_SONG:
            return Object.assign({}, state, { song: payload }); 
        default: 
            return state;
    }
}

export default admin;