import React from 'react';
import { Link } from 'react-router-dom';

import './SongCard.css';

function SongCard({song}) {
    return (
        <div className="song-card-box">
            <Link to={'/song/' + song.slug}>
                <div className="song-image">
                    <img src={song.image} alt="" />
                    <div className="btn-play">
                        <i className="ri-play-circle-fill"></i>
                    </div>
                </div>
            </Link>
            <div className="song-info">
                <span>{song.name}</span>
                <br/>
                <p>{song.artist}</p>
            </div>
        </div>  
    )
}

export default SongCard
