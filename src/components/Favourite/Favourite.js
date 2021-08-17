import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cookies from 'js-cookie';

import { getFavourite } from '../../redux/actions/user';
import LoadingPage from '../LoadingPage/LoadingPage';
import heartBanner from '../../images/heart.svg';
import FavouriteTrack from './FavouriteTrack';
import './Favourite.css';

function Favourite() {
    const userId = cookies.get('userId');
    const { favourite, loading } = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFavourite(userId));
    }, [favourite])
    
    return (
        <div>
            { loading ? <LoadingPage/> : (
                <div className="favourite-container">
                    <div className="favourite-wrapper">
                        <div className="favourite-header">
                            <img 
                                src={heartBanner} 
                                className="favourite-background" 
                                alt="Favourite"
                            />
                        </div>
                        <div className="favourite-song-container">
                            <div className="favourite-title">
                                <div className="favourite-title-index">#</div>
                                <div className="favourite-title-text">
                                    <span>TITLE</span>
                                </div>
                            </div>
                            <hr className="favourite-vertical"/>
                            {
                                favourite.map((song, index) => {
                                    return  <FavouriteTrack
                                                key={index}
                                                index={index + 1}
                                                song={song}
                                            />
                                })
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Favourite;
