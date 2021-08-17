import React from 'react';
import { Link } from 'react-router-dom';
import { RiPlayCircleFill } from 'react-icons/ri';
import useConvertToSlug from '../../hooks/useConvertToSlug';

import './SongCard.css';

function SongCard({song}) {
    return (
        <div className="song-card-box">
            <Link 
                to={`/song/${song.slug}`}
            >
                <div className="song-image">
                    <img src={song.image} alt={`${song.name} - ${song.artist}`} />
                    <div className="btn-play">
                        <RiPlayCircleFill style={{ color: '#73d99f'}}/>
                    </div>
                </div>
            </Link>
            <div className="song-info">
                <Link to={'/song/' + song.slug}>
                    {song.name}
                </Link>
                <br/>
                <Link to={'/artist/' + useConvertToSlug(song.artist)}>
                    {song.artist}
                </Link>
            </div>
        </div>  
    )
}

export default SongCard;
