import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import AudioBar from '../../components/AudioBar/AudioDemo';

function Layout() {
    const [ isOpen, setIsOpen ] = useState(false);
    const toggleBar = (status) => {
        setIsOpen(status);
    }
    return (
        <React.Fragment>
            <Sidebar isOpen={isOpen}/>  
            <Header toggleBar={toggleBar}/>
            <AudioBar/>
        </React.Fragment>
    )
}

export default Layout;
