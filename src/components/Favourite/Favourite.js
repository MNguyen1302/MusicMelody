import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cookies from 'js-cookie';

import actions from '../../redux/actions/user';
import LoadingPage from '../LoadingPage/LoadingPage';
import heartBanner from '../../images/heart.svg';
import FavouriteTrack from './FavouriteTrack';
import FavouriteArtist from './FavouriteArtist';
import { RiPlayCircleFill } from 'react-icons/ri';
import './Favourite.css';

function Favourite() {
    const userId = cookies.get('userId');
    const { user, isLogged, favourite, artists, loading } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const history = useHistory();

    // if(!isLogged) {
    //     history.push('/auth/login');
    // }

    useEffect(() => {
        dispatch(actions.getFavourite(userId));
    }, [favourite])

    const handlePlayBtn = () => {
        dispatch({
            type: 'ADD_CURRENT_PLAYLIST',
            payload: favourite
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
                <div className="favourite-container">
                    <div className="favourite-wrapper">
                        <div className="favourite-box-left">
                            <div className="favourite-detail">
                                <div className="favourite-detail-image">
                                    <img src={heartBanner} alt=""/>
                                    <button 
                                        id="btn-play"
                                        className="btn btn-toggle-play btn-favourite" 
                                        onClick={handlePlayBtn}
                                    >
                                        <RiPlayCircleFill className="icon-play"/>
                                    </button>
                                </div>
                                <div className="favourite-detail-title">
                                    <span>Favourite Songs</span>                                
                                </div>
                                { 
                                    user && (
                                        <div className="favourite-user-info">
                                            <img src={user.avatar} alt="Avatar User"/>
                                            <span>{user.name}</span>
                                        </div>
                                    )
                                }
                                {
                                    favourite && (
                                        <div className="favourite-detail-extra">
                                            <span>{favourite.length} {favourite.length > 1 ? 'tracks' : 'track'}</span>
                                            <span>{artists.length} {artists.length > 1 ? 'artists' : 'artist'}</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="favourite-box-right">
                        {
                                favourite.length ? (
                                    <div className="favourite-song-container">
                                        <hr className="favourite-vertical"/>
                                        {
                                            favourite.map((song, index) => {
                                                return  <FavouriteTrack
                                                            key={index}
                                                            index={index + 1}
                                                            playlist={favourite}
                                                            song={song}
                                                        />
                                            })
                                        }
                                    </div>
                                ) : (
                                    <div className='favourite-song-container-status'>
                                        <div className="favourite-song-container-text">
                                            <span>You haven't liked any songs yet?</span>
                                            <br/>
                                            <span>Save songs by tapping the heart icon</span>
                                        </div>
                                        <div className="btn-find">
                                            <Link to="/">Find Songs</Link>
                                        </div>
                                    </div>
                                )
                            }
                            <div className="favourite-title">
                                    <span>Your Artist</span>
                                </div>
                            <div className="favourite-artist-container">
                                {
                                    artists.map(artist => {
                                        return <FavouriteArtist
                                                    key={artist._id}
                                                    artist={artist}
                                                />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Favourite;
