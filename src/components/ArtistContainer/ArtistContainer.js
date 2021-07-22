import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllArtist } from '../../redux/actions/artist';
import ArtistCard from '../ArtistCard/ArtistCard';
import './ArtistContainer.css';

function ArtistContainer(props) {
    const { artists } = useSelector(state => state.artist);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllArtist());
    }, [artists])

    return (
        <div className="artist-container">
            <div className="artist-title">
                <div className="title">
                    <h2>{props.title}</h2>
                </div>
                {
                    props.title === 'All Artist' ? (
                        // <div className="sort-artist-box">
                        //     <div 
                        //         className="sort-artist-btn"
                        //         onClick={handlePopup}    
                        //     >
                        //         <h3>Sort</h3>
                        //         <i className="ri-sort-asc"></i>
                        //     </div>
                        //     <div className={ isPopup ? "sort-artist-dropdown show" : "sort-artist-dropdown"}>
                        //         <span className="sort-a-z" onClick={ () => handleSort(true) }>A-Z</span>
                        //         <span className="sort-z-a" onClick={ () => handleSort(false)}>Z-A</span>
                        //     </div>
                        // </div> 
                        ''
                    ) : (
                        <div className="viewmore">
                            <Link to="/allartist">
                                <h3>See All</h3>
                                <i className="ri-arrow-right-s-line"></i>
                            </Link>
                        </div>
                    )
                }
            </div>
            <div className="artist-wrapper">
                {
                    artists.slice(0, 6).map(artist => {
                        return  <ArtistCard
                                    key={artist._id}
                                    artist={artist}
                                />
                    })
                }
            </div>
        </div>
    )
}

export default ArtistContainer;
