import React from 'react';
import { AiOutlineMore } from 'react-icons/ai';

function ArtistTrack({song, index}) {
    return (
        <div className="artist-track">
            <div className="artist-track-index">{index}</div>
            <div className="artist-track-image">
                <img src={song.image}/>
            </div>
            <div className="artist-track-name">
                <span>{song.name}</span>
            </div>
            <div className="artist-track-icon">
                <i className="far fa-heart"></i>
                <AiOutlineMore/>
            </div>
        </div>
    )
}

export default ArtistTrack;
