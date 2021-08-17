import React from 'react';
import { Link } from 'react-router-dom';

import './ArtistCard.css';

function ArtistCard({artist}) {
    return (
        <div className="artist-card-box">
            <Link 
                to={`/artist/${artist.artistSlug}`}
            >
                <div className="artist-image">
                    <img src={artist.image} alt={artist.name} />
                    <div className="artist-background">
                        <i className="fas fa-circle"></i>
                    </div>
                </div>
            </Link>
            <div className="artist-info">
                <span>{artist.name}</span>
            </div>
        </div>  
    )
}

export default ArtistCard;
