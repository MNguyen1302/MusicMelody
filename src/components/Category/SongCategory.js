import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getCategory } from '../../redux/actions/song';
import SongCard from '../SongCard/SongCard';
import './Category.css';

function CategoryShow() {
    const { category } = useSelector(state => state.song);
    const { type } = useParams();
    const dispatch = useDispatch();

    const [ isPopup, setPopup ] = useState(false);
    const [ isSortAZ, setSortAZ ] = useState(false);
    
    useEffect(() => {
        dispatch(getCategory(type));
    }, [])

    const handlePopup = () => {
        setPopup(!isPopup);
    }

    const handleSort = (status) => {
        setSortAZ(status);

        if(!isSortAZ) {
            category.sort((a, b) => {
                let textA = a.name.toLowerCase();
                let textB = b.name.toLowerCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
        } else {
            category.sort((a, b) => {
                let textA = a.name.toLowerCase();
                let textB = b.name.toLowerCase();
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            })
        }
    } 

    return (
        <div className="allsong-container">
            <div className="allsong-wrapper">
                <div className="category-container">
                    <div className="category-title">
                        <div className="title">
                            <h2>{type}</h2>
                        </div>
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
                    </div>
                    <div className="category-wrapper">
                        { category.map(song => {
                            return <SongCard
                                key={song._id}
                                song={song}
                            />
                        })}  
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CategoryShow;