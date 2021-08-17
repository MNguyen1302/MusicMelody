import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoadingS3 from '../Loading/LoadingS3';
import actions from '../../redux/actions/songs';
import SongItemTab from './SongItemTab';
import ArtistItemTab from './ArtistItemTab';
import './Tab.css';

function Tab() {
    const { trending, loading } = useSelector(state => state.songs);
    const { artists } = useSelector(state => state.artist)
    const dispatch = useDispatch();

    const [ indexTab, setIndexTab ] = useState(1);

    useEffect(() => {
        dispatch(actions.getTopSong());
    }, [trending])
    
    const handleTabClick = (index) => {
        setIndexTab(index);
    }

    return (
        <div className="tab-wrapper">
            <div className="tabs-title">
                <div 
                    onClick={ () => handleTabClick(1) }
                    className={ indexTab === 1 ? 'tab-item active' : 'tab-item' } 
                >
                    <span>Trending</span>
                </div>
                <div 
                    onClick={ () => handleTabClick(2) }
                    className={ indexTab === 2 ? 'tab-item active' : 'tab-item' }    
                >
                    <span>Artist</span>
                </div>
                <div 
                    onClick={ () => handleTabClick(3) }
                    className={ indexTab === 3 ? 'tab-item active' : 'tab-item' }    
                >
                    <span>National</span>
                </div>
            </div>
            <div className="tabs-content">
                <div 
                    onClick={ () => handleTabClick(1) }
                    className={ indexTab === 1 ? 'tab-pane active' : 'tab-pane' }    
                >
                    {
                        loading ? (
                            <div>
                                <LoadingS3/>
                                <LoadingS3/>
                                <LoadingS3/>
                                <LoadingS3/>
                                <LoadingS3/>
                                <LoadingS3/>
                                <LoadingS3/>
                            </div>
                        ) : (
                            trending.map((song, index) => {
                                return <SongItemTab 
                                    key={song._id}
                                    index={index + 1}
                                    song={song}
                                />
                            })
                        )
                    }
                </div>
                <div 
                    onClick={ () => handleTabClick(2) }
                    className={ indexTab === 2 ? 'tab-pane active' : 'tab-pane' }      
                >
                    {
                        loading ? (
                            <div>
                                <LoadingS3/>
                                <LoadingS3/>
                                <LoadingS3/>
                                <LoadingS3/>
                                <LoadingS3/>
                                <LoadingS3/>
                                <LoadingS3/>
                            </div>
                        ) : (
                            artists.map((artist, index) => {
                                return <ArtistItemTab 
                                    key={artist._id}
                                    index={index + 1}
                                    artist={artist}
                                />
                            })
                        )
                    }
                </div>
                <div
                    onClick={ () => handleTabClick(3) }
                    className={ indexTab === 3 ? 'tab-pane active' : 'tab-pane' }  
                >
                    {/* <TabItem /> */}
                </div>
            </div>
        </div>
    )
}

export default Tab;
