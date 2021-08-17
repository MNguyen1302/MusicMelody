import React from 'react';
import { Link } from 'react-router-dom';

function FavouriteArtist({artist}) {
    return (
        <div className="favourite-artist-card-box">
            <Link 
                to={`/artist/${artist.artistSlug}`}
            >
                <div className="favourite-artist-image">
                    <img src={artist.image} alt={artist.name} />
                    <div className="favourite-artist-background">
                        <i className="fas fa-circle"></i>
                    </div>
                </div>
            </Link>
            <div className="favourite-artist-info">
                <span>{artist.name}</span>
            </div>
        </div>  
    )
}

export default FavouriteArtist;
