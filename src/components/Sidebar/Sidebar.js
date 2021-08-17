import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SidebarItem from './SidebarItem';
import { AiOutlineMenu, AiOutlineHome } from 'react-icons/ai';
import { RiHeadphoneLine, RiHeartLine, RiEqualizerLine, RiHistoryLine, RiLineChartLine, RiAddLine, RiUserAddLine, RiFileList2Line } from 'react-icons/ri';
import { TiThLargeOutline, TiMicrophoneOutline } from 'react-icons/ti';
import cookies from 'js-cookie';

import actions from '../../redux/actions/playlist';
import './Sidebar.css';

function Sidebar({isOpen}) {
    const userId = cookies.get('userId');

    const { user } = useSelector(state => state.user);
    const { playlists } = useSelector(state => state.playlist);

    const dispatch = useDispatch();

    const [ sidebarItem, setSidebarItem ] = useState([]);

    useEffect(() => {
        const sidebar = [
            {
                label: 'Home',
                icon: <AiOutlineHome/>,
                url: '/'
            },
            {
                label: 'Latest',
                icon: <RiHeadphoneLine/>,
                url: '/latest'
            },
            {
                label: 'Category',
                icon: <TiThLargeOutline/>,
                url: '/category'
            },
            {
                label: 'Artists',
                icon: <TiMicrophoneOutline/>,
                url: '/artist'
            },
            {
                label: 'Favourites',
                icon: <RiHeartLine/>,
                url: '/favourites'
            },
            {
                label: 'Setting',
                icon: <RiEqualizerLine/>,
                url: '/setting'
            },
            {
                label: 'History',
                icon: <RiHistoryLine/>,
                url: '/history'
            },
            {
                label: 'Dashboard',
                icon: <RiLineChartLine/>,
                url: '/dashboard'
            },
            {
                label: 'Add Music',
                icon: <RiAddLine/>,
                url: '/admin/create/song'
            },
            {
                label: 'Add Artist',
                icon: <RiUserAddLine/>,
                url: '/admin/create/artist'
            },
            {
                label: 'My Post',
                icon: <RiFileList2Line/>,
                url: '/admin/store/song'
            }
        ]

        setSidebarItem(sidebar);
    }, [])

    useEffect(() => {
        dispatch(actions.getPlaylist(userId));
    }, [playlists])

    const handleCreatePlaylist = () => {
        dispatch(actions.createPlaylist(userId));
    }

    const closeToggleBar = () => {
    }

    return (
        <aside className={ isOpen ? 'sidebar open' : 'sidebar'}>
            <div className="sidebar-logo">
                <a href="#" className="header-logo">
                    <img src="https://img.freepik.com/free-vector/note-music-logo-design_93835-645.jpg?size=338&ext=jpg" alt=""/>
                    <div className="title-logo">
                        <span>Music Cloud</span>
                    </div>
                </a>
                <div className="icon-menu-sidebar">
                    <div className="menu-btn">
                        <div 
                            className="toggle-bars"
                            onClick={closeToggleBar}
                        >
                            <AiOutlineMenu/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="menu-sidebar">
                <ul className="sidebar-side">
                    <li className="sidebar-header">Brower Music</li>
                    {
                        sidebarItem.slice(0, 4).map((item, index) => {
                            return  <SidebarItem 
                                        key={ index }
                                        sidebar={ item }
                                        index={ index }
                                    />
                        })
                    }
                    <li className="sidebar-header">Your Music</li>
                    {
                        sidebarItem.slice(4, 7).map((item, index) => {
                            return  <SidebarItem 
                                        key={ index }
                                        sidebar={ item }
                                    />
                        })
                    }
                    { user && user.role === 'admin' && (<li className="sidebar-header">Admin</li>) }
                    {
                        user && user.role === 'admin' && (
                            sidebarItem.slice(7).map((item, index) => {
                                return  <SidebarItem 
                                            key={ index }
                                            sidebar={ item }
                                        />
                            })
                        )
                    }
                    <li 
                        className="sidebar-header" 
                        style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between'
                        }}
                    >
                        <span>Playlists</span>
                        { user && <span onClick={handleCreatePlaylist}><RiAddLine/></span> }
                    </li>
                    {
                        playlists.map((item, index) => {
                            return  <SidebarItem 
                                        key={ index }
                                        sidebar={ item }
                                    />
                        })
                    }
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar
