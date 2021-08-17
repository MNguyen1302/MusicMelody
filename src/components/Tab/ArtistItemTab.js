import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMore } from 'react-icons/ai';
import { RiHeartLine } from 'react-icons/ri';

function ArtistItemTab({artist, index}) {
    return (
        <div className="tab-pane-block">
            <div className="song-list-left">
                <div className="song-list-number">
                    <span>{index}</span>
                </div>
                <div className="song-list-image">
                    <img src={artist.image} alt={artist.name} />
                </div>
                <div className="artist-list-info">
                    <Link to={`/artist/${artist.artistSlug}`}><span>{artist.name}</span></Link>
                </div>
            </div>
            <div className="song-list-icon">
                <span className="song-list-likecount">{artist.followerCount}</span>
                <span style={{ color: '#73d99f', padding: '0 2px' }}>
                    <RiHeartLine/>
                </span>
                <span><AiOutlineMore/></span>
            </div>
        </div>  
    )
}

export default ArtistItemTab;
