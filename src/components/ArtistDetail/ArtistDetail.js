import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import ColorThief from 'colorthief';
import axios from 'axios';
import cookies from 'js-cookie'

import LoadingPage from '../LoadingPage/LoadingPage';
import Modal from '../Modal/Modal';
import ArtistTrack from './ArtistTrack';
import actions from '../../redux/actions/artist';
import { AiOutlineUser } from 'react-icons/ai';
import './ArtistDetail.css';

function ArtistDetail() {
    const userId = cookies.get('userId');
    const { isLogged } = useSelector(state => state.user);
    const { artist, songs, loading } = useSelector(state => state.artist);
    const dispatch = useDispatch();
    const history = useHistory();

    const { slug } = useParams();
    const imgRef = useRef();

    const [ indexTab, setIndexTab ] = useState(1);
    const [ color, setColor ] = useState();
    const [ isFollowing, setIsFollowing] = useState(false);
    const [ showModal, setShowModal ] = useState(false);
    const [ follower, setFollower ] = useState([]);

    useEffect(() => {
        dispatch(actions.getArtist(slug));
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8080/artist/${slug}/follower`)
        .then(res => {
            setFollower(res.data.followerCount);
        })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8080/artist/${slug}/follower`)
        .then(res => {
            setIsFollowing(res.data.follower.includes(userId));
        })
    }, [userId])

    const handleTabClick = (index) => {
        setIndexTab(index);
    }

    const handleFollowBtn = () => {
        if(!isLogged) {
            history.push('/auth/login');
            return;
        }
        
        dispatch(actions.followArtist(slug, userId));
        
        setTimeout(() => {
            setFollower(!isFollowing ? follower + 1 : follower - 1);
            setIsFollowing(!isFollowing);
            setShowModal(true);
        }, 500);

        setTimeout(() => {
            setShowModal(false);
        }, [3000])
    }
      
    return (
        <div>
            { loading ? <LoadingPage/> : (
                <div className="artist-detail-container">
                    <div className="artist-detail-wrapper">
                        <div 
                            className="artist-detail-header"
                            style={{ background: `rgb(${color})`}}    
                        >
                            <div className="artist-detail">
                                <div className="artist-detail-image">
                                    <img 
                                        src={artist.image} 
                                        crossOrigin="anonymous"
                                        alt={artist.name}
                                        ref={imgRef}
                                        onLoad={ () => {
                                            let colorThief = new ColorThief();
                                            let img = imgRef.current
                                            let result = colorThief.getColor(img);
                                            setColor(result);
                                        }}    
                                    />
                                </div>
                                <div className="artist-detail-info">
                                    <span className="artist-text">Artist</span>
                                    <br/>
                                    <div className="artist-name-box">
                                        <span className="artist-name">{artist.name}</span>
                                        <span 
                                            className="artist-type-song"
                                            style={{
                                                color: `rgb(${color})`,
                                                border: `solid 1px rgb(${color})`
                                            }}
                                        >
                                            {artist.genre}
                                        </span>
                                    </div>
                                    <div className="artist-follow">
                                        <div className="follow-count">
                                            <span>{follower}</span>
                                            <AiOutlineUser/>
                                        </div>
                                        <div className="btn-follow">
                                            <button onClick={handleFollowBtn}>
                                                { !isFollowing ? 'Follow' : 'Following'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="artist-tab">
                            <div className="artist-tab-title">
                                <div 
                                    onClick={ () => handleTabClick(1) }
                                    className={ indexTab == 1 ? 'artist-tab-item active' : 'artist-tab-item'}
                                >
                                    <span>Top Track</span>
                                </div>
                                <div 
                                    onClick={ () => handleTabClick(2) }
                                    className={ indexTab == 2 ? 'artist-tab-item active' : 'artist-tab-item'}
                                >
                                    <span>Album</span>
                                </div>
                                <div 
                                    onClick={ () => handleTabClick(3) }
                                    className={ indexTab == 3 ? 'artist-tab-item active' : 'artist-tab-item'}
                                >
                                    <span>About</span>
                                </div>
                            </div>
                            <hr className="style-vertical"/>
                            <div className="artist-tab-content">
                                <div 
                                    onClick={ () => handleTabClick(1) }
                                    className={ indexTab == 1 ? 'artist-tab-pane active' : 'artist-tab-pane'}
                                >
                                    {
                                        songs.map((song, index) => {
                                            return  <ArtistTrack 
                                                        key={index}
                                                        song={song}
                                                        index={index + 1}
                                                    />
                                        })
                                    }
                                </div>
                                <div 
                                    onClick={ () => handleTabClick(2) }
                                    className={ indexTab == 2 ? 'artist-tab-pane active' : 'artist-tab-pane'}
                                >

                                </div>
                                <div 
                                    onClick={ () => handleTabClick(3) }
                                    className={ indexTab == 3 ? 'artist-tab-pane active' : 'artist-tab-pane'}
                                >
                                    <span className="artist-detail-about">{artist.description}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    { showModal ? <Modal content={isFollowing ? 'Add to your Favourite Artists' : 'Remove from your Favourite Artists'}/> : ''}
                </div>
            )}
        </div>
    )
}

export default ArtistDetail;
