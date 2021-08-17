import React from 'react';
import Carousel from '../../components/Carousel/Carousel';
import SongContainer from '../../components/SongContainer/SongContainer';
import ArtistContainer from '../../components/ArtistContainer/ArtistContainer';

function Home() {
    return (
        <div className="content-page">
            <Carousel/>
            <SongContainer title='Top Song'/>
            <SongContainer title='New Release'/>
            <ArtistContainer title='Popular Artist'/>
        </div>
    )
}

export default Home;
