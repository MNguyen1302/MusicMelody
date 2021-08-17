import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RiEditFill, RiPlayCircleFill, RiPauseCircleFill } from 'react-icons/ri';
import cookies from 'js-cookie';
import moment from "moment";

import actions from '../../redux/actions/playlist';
import LoadingPage from '../LoadingPage/LoadingPage';
import EditPlaylist from './EditPlaylist';
import FavouriteTrack from '../Favourite/FavouriteTrack';
import './Playlist.css';

function Favourite() {
    const userId = cookies.get('userId');
    const { user, isLogged } = useSelector(state => state.user);
    const { playlist, loading } = useSelector(state => state.playlist);

    const [ isShow, setIsShow ] = useState(false);
    
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    // if(!isLogged) {
    //     history.push('/auth/login');
    // }

    useEffect(() => {
        dispatch(actions.getPlaylistDetail(userId, id));
    }, [playlist])

    const handlePopup = () => {
        setIsShow(!isShow);
    }

    const handleClosePopup = (isShow) => {
        setIsShow(isShow);
    }

    const handlePlayBtn = () => {
        dispatch({
            type: 'ADD_CURRENT_PLAYLIST',
            payload: playlist.songs
        })
        dispatch({
            type: 'PLAY_PAUSE_PLAYLIST',
            payload: {
                currPlaylist: JSON.parse(localStorage.getItem('currPlaylist'))
            }
        })
        document.getElementById("btn-play").click();
    }

    return (
        <div>
            { loading ? <LoadingPage/> : (
                <div className="playlist-container">
                    { isShow && <EditPlaylist 
                                    id={playlist._id}
                                    playlist={playlist} 
                                    closePopup={handleClosePopup}
                                /> }
                    <div className="playlist-wrapper">
                        <div className="playlist-box-left">
                            <div className="playlist-detail">
                                <div className="playlist-detail-image">
                                    <img src={playlist.image} alt={playlist.name}/>
                                    <div className="playlist-edit">
                                        <RiEditFill onClick={handlePopup}/>
                                    </div>
                                    <button 
                                        id="btn-play"
                                        className="btn btn-toggle-play btn-playlist" 
                                        onClick={handlePlayBtn}
                                    >
                                        <RiPlayCircleFill className="icon-play"/>
                                    </button>
                                </div>
                                <div className="playlist-detail-title">
                                    <span>{playlist.name}</span>                                
                                </div>
                                {
                                    user && (
                                        <div className="playlist-user-info">
                                            <img src={user.avatar} alt="Avatar User"/>
                                            <span>{user.name}</span>
                                        </div>
                                    )
                                }
                                {
                                    playlist.songs && (
                                        <div className="playlist-detail-extra">
                                            <span>{playlist.songs.length} {playlist.songs.length > 1 ? 'tracks' : 'track'}</span>
                                        </div>
                                    )
                                }
                                <div className="playlist-detail-time">
                                    <span>{moment(playlist.date).fromNow()}</span>
                                </div>
                                {
                                    playlist.description && (
                                        <div className="playlist-detail-description">
                                            <span>{playlist.description}</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        {
                            playlist.songs.length ? (
                                <div className="playlist-box-right">
                                    <hr className="playlist-vertical"/>
                                    {
                                        playlist.songs.map((song, index) => {
                                            return  <FavouriteTrack
                                                        key={index}
                                                        index={index + 1}
                                                        playlist={playlist.songs}
                                                        song={song}
                                                    />
                                        })
                                    }
                                </div>
                            ) : (
                                <div className="playlist-box-right">
                                    <div className='playlist-song-container-status'>
                                        <div className="playlist-song-container-text">
                                            <span>You haven't added any songs yet?</span>
                                        </div>
                                        <div className="btn-find">
                                            <Link to="/">Find Songs</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default Favourite;
