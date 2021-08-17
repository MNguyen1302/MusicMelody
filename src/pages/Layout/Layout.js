import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import AudioBar from '../../components/AudioBar/AudioBar';

function Layout() {
    return (
        <React.Fragment>
            <Sidebar />  
            <Header />
            <AudioBar/>
        </React.Fragment>
    )
}

export default Layout;
