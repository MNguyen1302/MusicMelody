import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMore } from 'react-icons/ai';
import { RiHeartLine } from 'react-icons/ri';
import useComponentVisible from '../../hooks/useComponentVisible';
import useConvertToSlug from '../../hooks/useConvertToSlug';

function SongItemTab({song, index}) {
    const { ref, isComponentVisible, handleClickInside } = useComponentVisible(false);

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
                    <Link to={`/song/${song.slug}`}><span>{song.name}</span></Link>
                    <Link to={'/artist/' + useConvertToSlug(song.artist)}><span>{song.artist}</span></Link>
                </div>
            </div>
            <div className="song-list-icon">
                <span className="song-list-likecount">{song.likeCount}</span>
                <span style={{ color: '#73d99f', padding: '0 2px' }}>
                    <RiHeartLine/>
                </span>
                <span><AiOutlineMore onClick={handleClickInside}/></span>
                <div 
                    className="tab-popup-more"
                    ref={ref}
                    style={{ display: isComponentVisible ? 'block' : 'none' }}    
                >
                    <ul>
                        <li>
                            <Link to={'/artist/' + useConvertToSlug(song.artist)}><span>Go to artist</span></Link>
                        </li>
                        <li>Go to album</li>
                        <li>Like Song</li>
                        <li>Add to playlist</li>
                        <li>Share</li>
                    </ul>
                </div>
            </div>
        </div>  
    )
}

export default SongItemTab;
