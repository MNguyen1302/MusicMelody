import * as types from '../types';

let initialState = {
    currSong: JSON.parse(localStorage.getItem('currSong')),
    songs: [],
    song: {},
    comments: [],
    trending: [],
    category: [],
    loading: false,
    error: null
}

const song = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case types.TOGGLE_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.GET_SONG: 
            return {
                ...state,
                song: payload.song,
                comments: payload.comments,
                loading: false
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
        case types.ADD_CURRENT_SONG:
            localStorage.setItem('currSong', JSON.stringify(payload));

            return {
                ...state,
            }
        case types.CREATE_SONG: 
            return {
                ...state,
                songs: [...state.songs, payload]
            }
        case types.DELETE_SONG:
            return {
                ...state
            }
        case types.EDIT_SONG:
            return Object.assign({}, state, { song: payload }); 
        case types.LIKE_SONG: 
            return {
                ...state
            }
        case types.PLAY_PAUSE_SONG: 
            return {
                ...state,
                currSong: payload.currSong,
                isPlaying: payload.isPlaying
            }
        case types.POST_COMMENT: 
            return {
                ...state,
                comments: [...state.comments, payload]
            }
        default: 
            return state;
    }
}

export default song;