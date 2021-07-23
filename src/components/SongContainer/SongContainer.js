import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllSongs } from '../../redux/actions/song';
import SongCard from '../SongCard/SongCard';
import LoadingS2 from '../Loading/LoadingS2';
import './SongContainer.css';

function SongContainer(props) {
    const { songs, loading } = useSelector(state => state.song);
    const dispatch = useDispatch();

    const [ isSortAZ, setSortAZ ] = useState(false);
    const [ isPopup, setPopup ] = useState(false);

    useEffect(() => {
        dispatch(getAllSongs());
    }, [songs])

    const songTitleSwitch = (title) => {
        switch(title) {
            case 'Top Song':
                return songs.slice(0, 6).map((song, index) => {
                    return  <SongCard 
                                key={index}
                                song={song}
                            />
                    })

            case 'New Release': 
                return songs.slice(4, 10).map((song, index) => {
                    return  <SongCard 
                                key={index}
                                song={song}
                            />
                    })

            case 'All Songs': 
                return songs.map((song, index) => {
                    return  <SongCard 
                                key={index}
                                song={song}
                            />
                    })
            default: 
                return '';
        }

    }

    const handlePopup = () => {
        setPopup(!isPopup);
    }

    const handleSort = (status) => {
        setSortAZ(status);

        if(!isSortAZ) {
            songs.sort((a, b) => {
                let textA = a.name.toLowerCase();
                let textB = b.name.toLowerCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
        } else {
            songs.sort((a, b) => {
                let textA = a.name.toLowerCase();
                let textB = b.name.toLowerCase();
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            })
        }
    } 

    return (
        <div className="song-container">
            <div className="song-title">
                <div className="title">
                    <h2>{props.title}</h2>
                </div>
                {
                    props.title === 'All Song' ? (
                        <div className="sort-song-box">
                            <div 
                                className="sort-song-btn"
                                onClick={handlePopup}    
                            >
                                <h3>Sort</h3>
                                <i className="ri-sort-asc"></i>
                            </div>
                            <div className={ isPopup ? "sort-song-dropdown show" : "sort-song-dropdown"}>
                                <span className="sort-a-z" onClick={ () => handleSort(true) }>A-Z</span>
                                <span className="sort-z-a" onClick={ () => handleSort(false)}>Z-A</span>
                            </div>
                        </div>
                    ) : (
                        <div className="viewmore">
                            <Link to="/allsongs">
                                <h3>View More</h3>
                                <i className="ri-arrow-right-s-line"></i>
                            </Link>
                        </div>
                    )
                }
            </div>
            <div className="song-wrapper">
                {
                    loading ? (
                        <div className="song-loader">
                            <LoadingS2/>
                            <LoadingS2/>
                            <LoadingS2/>
                            <LoadingS2/>
                            <LoadingS2/>
                            <LoadingS2/>
                        </div>
                    ) : (songTitleSwitch(props.title))
                }
            </div>
        </div>
    )
}

export default SongContainer