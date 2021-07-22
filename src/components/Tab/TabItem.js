import React from 'react';
import { Link } from 'react-router-dom';

function TabItem({song, index}) {
    return (
        <div className="tab-pane-block">
            <div className="song-list-left">
                <div className="song-list-number">
                    <span>{index}</span>
                </div>
                <div className="song-list-image">
                    <img src={song.image} alt={song.name} />
                </div>
                <div className="song-list-info">
                    <Link to={'/song/' + song.slug}><span>{song.name}</span></Link>
                    <a><span>{song.artist}</span></a>
                </div>
            </div>
            <div className="song-list-icon">
                <span className="song-list-likecount">{song.likeCount}</span>
                <span style={{ color: '#73d99f', padding: '0 10px' }}>
                    <i className="fas fa-heart"></i>
                </span>
                <span><i className="ri-more-2-line"></i></span>
            </div>
        </div>  
    )
}

export default TabItem;
