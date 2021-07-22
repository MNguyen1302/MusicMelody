import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Link, 
    useParams,
    useHistory } from 'react-router-dom';
import cookies from 'js-cookie';
import axios from 'axios';

import { getSong, likeSong } from '../../redux/actions/song';
import Comment from '../Comment/Comment';
// import Loading from '../Loading/Loading';
import './SongDetail.css';

function SongDetail() {
    const userId = cookies.get('userId');

    const { isLogged } = useSelector(state => state.user);
    const { song, comments } = useSelector(state => state.song);

    const { slug } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const audioElement = useRef();

    const [ isPlaying, setPlayPauseClick ] = useState(false);
    const [ isLoading, setLoading ] = useState(false);
    const [ isLiked, setIsLiked ] = useState(false);
    const [ userLikes, setUserLikes ] = useState(0);

    useEffect(() => {
        dispatch({
            type: 'ADD_CURRENT_SONG',
            payload: song
        })
    }, [song])

    useEffect(() => {
        dispatch(getSong(slug));
    }, [song, comments])

    useEffect(async () => {
        await axios.get(`http://localhost:8080/song/${slug}/getLike`)
        .then(res => {
            setUserLikes(res.data.length);
        })
    }, [])

    useEffect(async() => {
        await axios.get(`http://localhost:8080/song/${slug}/getLike`)
        .then(res => {
            setIsLiked(!res.data.includes(userId))
        })
    }, [userId])

    const handlePlayBtn = () => {
        setPlayPauseClick(!isPlaying);
        dispatch({
            type: 'PLAY_PAUSE_SONG',
            payload: {
                isPlaying: isPlaying,
                currSong: JSON.parse(localStorage.getItem('currSong'))
            }
        }) 
        document.getElementById("btn-play").click();
    }

    const handleLike = () => {
        if(!isLogged) {
            history.push('/auth/login');
            return;
        }

        setTimeout(() => {
            setUserLikes(isLiked ? userLikes + 1 : userLikes - 1);
            setIsLiked(!isLiked);
        }, 500);

        dispatch(likeSong(slug, userId));
    }

    return (
        <div className="song-detail-container">
            <div className="song-detail-wrapper">
                <div className="song-detail-header">
                    <img 
                        src={song.image} 
                        className="song-detail-background" 
                        alt=""
                    />
                    <div className="song-detail">
                        <div className="song-detail-image">
                            <img src={song.image} alt=""/>
                        </div>
                        <div className="song-detail-main">
                            <div className="song-detail-info">
                                <span>{song.name}</span>
                                <br/>
                                <span>{song.artist}</span>
                            </div>
                            <div className="song-detail-icon-box">
                                <audio id="audio" ref={audioElement} src={song.audio}></audio>
                                <div className="song-detail-icon">
                                    <button className="btn btn-toggle-play" onClick={handlePlayBtn}>
                                        <i className="ri-play-circle-fill icon-play"></i> 
                                    </button>
                                </div>
                                <div className="song-detail-extra">
                                    <Link to={song.audio} target="_blank" download={song.name + '-' + song.artist}>
                                        <i className="fas fa-download"></i>
                                    </Link>
                                    <span 
                                        className="btn-like" 
                                        id="btn-like"
                                        onClick={handleLike}
                                    >
                                        <span id="numbers-like">{userLikes}</span> 
                                        <svg 
                                            className={ !isLiked ? 'three on' : 'three' }
                                            width="16px" 
                                            height="16px" 
                                            viewBox="0 0 100 100"
                                        >
                                            <g className="heartOne">
                                                <path className="heartEX" d="M 90,40 a 20 20 0 1 0 -40,-25 a 20 20 0 1 0 -40,25 l 40,50  z" />
                                                <path className="heart" d="M 90,40 a 20 20 0 1 0 -40,-25 a 20 20 0 1 0 -40,25 l 40,50  z" />
                                                <path className="points" d="M 90,40 a 20 20 0 1 0 -40,-25 a 20 20 0 1 0 -40,25 l 40,50  z" />
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="song-detail-lyric">
                    <div className="song-detail-lyric-wrapper">
                        <div className="song-detail-lyric-title">Lyric {song.name}</div>
                        {/* {
                            isLoading ? (
                                <Loading/>
                            ) : (
                                <div className="lyric">{song.lyric}</div>
                            )
                        } */}
                        <div className="lyric">{song.lyric}</div>
                    </div>
                    <Comment 
                        slug={song.slug}
                        comments={comments}    
                    />
                </div>
            </div>
        </div>
    )
}

export default SongDetail;
