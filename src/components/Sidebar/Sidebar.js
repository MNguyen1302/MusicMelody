import React, { useState, useEffect } from 'react';
import SidebarItem from './SidebarItem';
import './Sidebar.css';

function Sidebar() {
    const [ sidebarItem, setSidebarItem ] = useState([]);
    useEffect(() => {
        const sidebar = [
            {
                label: 'Home',
                icon: 'fas fa-home',
                url: '/'
            },
            {
                label: 'Latest',
                icon: 'fas fa-headphones-alt',
                url: '/latest'
            },
            {
                label: 'Category',
                icon: 'fas fa-th-large',
                url: '/category'
            },
            {
                label: 'Artists',
                icon: 'fas fa-microphone',
                url: '/artist'
            },
            {
                label: 'Playlist',
                icon: 'ri-play-list-line',
                url: '/playlist'
            },
            {
                label: 'Favourites',
                icon: 'far fa-heart',
                url: '/favourites'
            },
            {
                label: 'Setting',
                icon: 'ri-equalizer-line',
                url: '/setting'
            },
            {
                label: 'History',
                icon: 'ri-history-line',
                url: '/history'
            },
            {
                label: 'Dashboard',
                icon: 'ri-line-chart-line',
                url: '/dashboard'
            },
            {
                label: 'Add Music',
                icon: 'ri-add-line',
                url: '/admin/post/song'
            },
            {
                label: 'Add Artist',
                icon: 'ri-user-add-line',
                url: '/admin/post/artist'
            },
            {
                label: 'My Post',
                icon: 'ri-file-list-line',
                url: '/admin/store/song'
            }
        ]

        setSidebarItem(sidebar);
    }, [])

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <a href="#" className="header-logo">
                    <img src="https://img.freepik.com/free-vector/note-music-logo-design_93835-645.jpg?size=338&ext=jpg" alt=""/>
                    <div className="title-logo">
                        <span>Music Cloud</span>
                    </div>
                </a>
                <div className="icon-menu-sidebar">
                    <div className="menu-btn">
                        <div className="toggle-bars">
                            <i className="fas fa-bars"></i>
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
                        sidebarItem.slice(4, 8).map((item, index) => {
                            return  <SidebarItem 
                                        key={ index }
                                        sidebar={ item }
                                    />
                        })
                    }
                    <li className="sidebar-header">Admin</li>
                    {
                        sidebarItem.slice(8).map((item, index) => {
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
