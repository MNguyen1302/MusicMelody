import * as types from '../types';

let initialState = {
    currPlaylist: JSON.parse(localStorage.getItem('currPlaylist')),
    currSong: '',
    playlists: [],
    playlist: {},
    index: 0,
    startSong: false,
    loading: false,
    errors: null
}

const playlist = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case types.TOGGLE_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.GET_PLAYLIST:
            return {
                ...state,
                playlists: payload,
            }
        case types.GET_PLAYLIST_DETAIL:
            return {
                ...state,
                playlist: payload,
                loading: false
            }
        case types.CREATE_PLAYLIST: 
            return {
                ...state,
                playlists: [...state.playlists, payload]
            }
        case types.UPDATE_PLAYLIST:
            return Object.assign({}, state, { playlist: payload }); 
        case types.ADD_CURRENT_PLAYLIST: 
            localStorage.setItem('currPlaylist', JSON.stringify(payload));
            localStorage.removeItem('currSong');
            
            return {
                ...state
            }
        case types.PLAY_PAUSE_PLAYLIST: 
            localStorage.removeItem('currSong');
            
            return {
                ...state,
                index: payload.index,
                startSong: payload.startSong,
                currPlaylist: payload.currPlaylist,
            }
        // case types.GET_TRACK_INDEX: 
        //     return {
        //         ...state,
        //         index: payload.index,
        //         startSong: payload.startSong,
        //         currPlaylist: payload.currPlaylist
        //     }
        case types.GET_CURRSONG_IN_PLAYLIST: 
            return {
                ...state,
                currSong: payload
            }
        default: 
            return state;
    }
}

export default playlist;