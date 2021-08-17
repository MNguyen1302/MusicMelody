import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import actions from '../../redux/actions/songs';
import SongCard from '../SongCard/SongCard';
import LoadingS2 from '../Loading/LoadingS2';
import { RiArrowRightSLine } from 'react-icons/ri';
import { MdSortByAlpha } from 'react-icons/md';
import './SongContainer.css';

function SongContainer(props) {
    const { songs, trending, loading } = useSelector(state => state.songs);
    const dispatch = useDispatch();

    const [ isSortAZ, setSortAZ ] = useState(false);
    const [ isPopup, setPopup ] = useState(false);

    useEffect(() => {
        dispatch(actions.getAllSongs());
    }, [songs])

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

    const songTitleSwitch = (title) => {
        switch(title) {
            case 'Top Song':
                return trending.slice(0, 6).map((song, index) => {
                    return  <SongCard 
                                key={index}
                                song={song}
                            />
                    })

            case 'New Release': 
                return songs.slice(songs.length-7, songs.length-1).map((song, index) => {
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

    return (
        <div className="song-container">
            <div className="song-title">
                <div className="title">
                    <h2>{props.title}</h2>
                </div>
                {
                    props.title === 'All Songs' ? (
                        <div className="sort-song-box">
                            <div 
                                className="sort-song-btn"
                                onClick={handlePopup}    
                            >
                                <h3>Sort</h3>
                                <MdSortByAlpha className="btn-sort"/>
                            </div>
                            <div className={ isPopup ? "sort-song-dropdown show" : "sort-song-dropdown"}>
                                <span className="sort-a-z" onClick={ () => handleSort(true) }>A-Z</span>
                                <span className="sort-z-a" onClick={ () => handleSort(false)}>Z-A</span>
                            </div>
                        </div>
                    ) : (
                        <div className="see-all">
                            <Link to="/allsongs">
                                <h3>See All</h3>
                                <RiArrowRightSLine/>
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

export default SongContainer;
