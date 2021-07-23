import React from 'react'

function FavouriteTrack({song, index}) {
    return (
        <div className="favourite-track">
            <div className="favourite-track-index">{index}</div>
            <div className="favourite-track-image">
                <img src={song.image}/>
            </div>
            <div className="favourite-track-info">
                <span>{song.name}</span>
                <span>{song.artist}</span>
            </div>
            <div className="favourite-track-icon">
                <i className="far fa-heart"></i>
                <i className="fas fa-ellipsis-v"></i>
            </div>
        </div> 
    )
}

export default FavouriteTrack
