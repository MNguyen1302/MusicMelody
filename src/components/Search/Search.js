import React from 'react';
import { Link } from 'react-router-dom';
import { RiHeartLine, RiCloseLine } from 'react-icons/ri';
import { AiOutlineMore } from 'react-icons/ai';
import useConvertToSlug from '../../hooks/useConvertToSlug';
import './Search.css';

function Search(props) {
    const handleCloseSearch = () => {
        props.closeSearchModal(false);
    }
    return (
        <div className="search-container">
            <div className="search-wrapper">
                <div className="search-title">
                    <div className="search-result-matching">
                        <span>{props.songs.length} result matching</span>
                    </div>
                    <div className="search-btn-close">
                        <span onClick={handleCloseSearch}><RiCloseLine/></span>
                    </div>
                </div>
                <div className="search-result-box">
                    {
                        props.songs.length ? props.songs.map(song => (
                            <div className="search-result-card" key={song._id}>
                                <div className="search-image">
                                    <img src={song.image} alt=""/>
                                </div>
                                <div className="search-result-info">
                                    <Link to={`/song/${song.slug}`}>
                                        <span>{song.name}</span>
                                    </Link>
                                    <Link to={'/artist/'}>
                                        <span>{song.artist}</span>
                                    </Link>
                                </div>
                                <div className="search-icon">
                                    <span><RiHeartLine/></span>
                                    <span><AiOutlineMore/></span>
                                </div>
                            </div>
                        )) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Search;
