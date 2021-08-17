import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineMore } from 'react-icons/ai';
import { RiHeartLine } from 'react-icons/ri';
import { IoMdArrowDropdown } from 'react-icons/io';
import { BsPlay, BsPause } from 'react-icons/bs';
import cookies from 'js-cookie';

import actions from '../../redux/actions/playlist';
import useComponentVisible from '../../hooks/useComponentVisible';
import useConvertToSlug from '../../hooks/useConvertToSlug';

function FavouriteTrack({song, index, playlist}) {
    const userId = cookies.get('userId');

    const { playlists, currSong } = useSelector(state => state.playlist);
    const dispatch = useDispatch();
    const { id } = useParams();

    const { ref, isComponentVisible, handleClickInside } = useComponentVisible(false);
    const [ isPlaying, setIsPlaying ] = useState(false);

    const handleAddToPlaylist = (id) => {
        dispatch(actions.addToPlaylist(userId, id, song.slug))
    }

    const handleRemoveFromPlaylist = () => {
        dispatch(actions.removeFromPlaylist(userId, id, song.slug));
    }

    const handleGetIndex = () => {
        setIsPlaying(!isPlaying);
        dispatch({
            type: 'ADD_CURRENT_PLAYLIST',
            payload: playlist
        })
        dispatch({
            type: 'PLAY_PAUSE_PLAYLIST',
            payload: {
                index: index - 1,
                startSong: true,
            }
        })
        document.getElementById("btn-play").click();
    }

    return (
        <div className={ currSong === song.name ? "favourite-track active" : "favourite-track"}>
            <div className="favourite-track-index">{index}</div>
            <div className="favourite-track-image">
                <img src={song.image}/>
                <div 
                    className="favourite-track-play"
                    onClick={handleGetIndex}    
                >
                    <BsPlay className="favourite-icon-play"/>
                    <BsPause className="favourite-icon-pause"/>
                </div>
            </div>
            <div className="favourite-track-info">
                <Link to={`/song/${song.slug}`}>
                    {song.name}
                </Link>
                <Link to={'/artist/' + useConvertToSlug(song.artist)}>
                    {song.artist}
                </Link>
            </div>
            <div className="favourite-track-icon">
                <RiHeartLine/>
                <AiOutlineMore 
                    title="More"
                    onClick={handleClickInside}    
                />
                <div 
                    className="favourite-popup-more"
                    ref={ref}
                    style={{ 
                        display: isComponentVisible ? 'block' : 'none',
                        fontSize: id ? '0.8em' : '1em'
                    }}    
                >
                    <ul>
                        <li>
                            <span>Go to artist</span>
                        </li>
                        <li>
                            <span>Go to album</span>
                        </li>
                        <li>
                            <span>Like Song</span>
                        </li>
                        { id && <li onClick={handleRemoveFromPlaylist}>
                                    <span>Remove from playlist</span>
                                </li>
                        }
                        <li className="popup-playlist-title">
                            <span>Add to playlist <IoMdArrowDropdown/></span>
                            {
                                playlists.length ? (
                                    <ul 
                                        className="popup-playlist"
                                        style={{ left: '-178px'}}    
                                    >
                                        {
                                            playlists.map(playlist => {
                                                return  <li
                                                            key={playlist._id}
                                                            onClick={ () => handleAddToPlaylist(playlist._id) }>{playlist.name}
                                                        </li>
                                            })
                                        }
                                    </ul>
                                ) : null
                            }
                        </li>
                        <li>
                            <span>Share</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div> 
    )
}

export default FavouriteTrack;
