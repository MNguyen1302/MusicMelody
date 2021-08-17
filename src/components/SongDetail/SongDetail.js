import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Link, 
    useParams,
    useHistory } from 'react-router-dom';
import { RiMoreFill, RiPlayCircleFill } from 'react-icons/ri';
import { AiOutlineDownload } from 'react-icons/ai';
import cookies from 'js-cookie';
import axios from 'axios';

import useComponentVisible from '../../hooks/useComponentVisible';
import actions from '../../redux/actions/song';
import Modal from '../Modal/Modal';
import Comment from '../Comment/Comment';
import PopupMore from '../PopupMore/PopupMore';
import LoadingPage from '../LoadingPage/LoadingPage';
import Share from '../Share/Share';
import './SongDetail.css';

function SongDetail() {
    const userId = cookies.get('userId');

    const { isLogged } = useSelector(state => state.user);
    const { song, comments, loading } = useSelector(state => state.song);
    const { isComponentVisible, handleClickInside } = useComponentVisible(false);

    const { slug } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const audioElement = useRef();

    const [ isPlaying, setPlayPauseClick ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);
    const [ isShared, setIsShared ] = useState(false);
    const [ isLiked, setIsLiked ] = useState(false);
    const [ userLikes, setUserLikes ] = useState(0);

    useEffect(() => {
        dispatch(actions.getSong(slug));
    }, [])

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
            type: 'ADD_CURRENT_SONG',
            payload: song
        })
        dispatch({
            type: 'PLAY_PAUSE_SONG',
            payload: {
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

        dispatch(actions.likeSong(slug, userId));

        setTimeout(() => {
            setUserLikes(isLiked ? userLikes + 1 : userLikes - 1);
            setIsLiked(!isLiked);
            setShowModal(true);
        }, 500);

        setTimeout(() => {
            setShowModal(false);
        }, 3000)
    }

    const showShareModal = (status) => {
        setIsShared(status);
    }

    const closeShareModal = (status) => {
        setIsShared(status);
    }

    return (
        <div>
            { loading ? <LoadingPage/> : (
                <div className="song-detail-container">
                    { isShared && <Share closeShareModal={closeShareModal}/>}
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
                                                <RiPlayCircleFill className="icon-play"/> 
                                            </button>
                                        </div>
                                        <div className="song-detail-extra">
                                            <Link to={song.audio} target="_blank" download={song.name + '-' + song.artist}>
                                                <AiOutlineDownload/>
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
                                            <span><RiMoreFill onClick={handleClickInside}/></span>
                                            <PopupMore 
                                                fontSize="0.75em" 
                                                isComponentVisible={isComponentVisible}
                                                showShareModal={showShareModal}    
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="song-detail-lyric">
                            <div className="song-detail-lyric-wrapper">
                                <div className="song-detail-lyric-title">Lyric {song.name}</div>
                                <div className="lyric">{song.lyric}</div>
                            </div>
                            <Comment 
                                slug={song.slug}
                                comments={comments}    
                            />
                        </div>
                    </div>
                    { showModal ? <Modal content={!isLiked ? 'Add to your Favourite Songs' : 'Remove from your Favourite Songs'}/> : ''}
                </div>
            )}
        </div>
    )
}

export default SongDetail;
