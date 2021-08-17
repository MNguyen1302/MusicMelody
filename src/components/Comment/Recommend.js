import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMore } from 'react-icons/ai';

function Recommend({song}) {
    return (
        <div className="song-recommend-card">
            <div className="song-recommend-box-left">
                <div className="song-recommend-image">
                    <img src={song.image} alt={`${song.name} - ${song.artist}`}/>
                </div>
                <div className="song-recommend-info">
                    <Link to={`/song/${song.slug}`}>{song.name}</Link>
                    <Link to={`/artist`}>{song.artist}</Link>
                </div>
            </div>
            <div className="song-recommend-more">
                <AiOutlineMore/>
            </div>
        </div>
    )
}

export default Recommend;
