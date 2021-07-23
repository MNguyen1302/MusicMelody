import * as types from '../types';

let initialState = {
    artists: [],
    artist: {},
    songs: [],
    loading: false,
    errors: null
}

const artist = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case types.TOGGLE_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.CREATE_ARTIST: 
            return {
                ...state,
                artists: [...state.artists, payload]
            }
        case types.GET_ALL_ARTIST: 
            return {
                ...state,
                artists: payload,
                loading: false
            }
        case types.GET_ARTIST:
            return {
                ...state,
                artist: payload.artist,
                songs: payload.songs,
                loading: false
            }
        case types.FOLLOW_ARTIST:
            return {
                ...state
            }
        default: 
            return state;
    }
}

export default artist;