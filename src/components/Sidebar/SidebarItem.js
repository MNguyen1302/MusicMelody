import React from 'react';
import { NavLink } from 'react-router-dom';

function SidebarItem(props) {
    return (
            <NavLink
                to={{ 
                    pathname: props.sidebar.url
                }}
                exact={true}
                activeStyle={{
                    color: 'white',
                    background: '#73d99f',
                    borderRadius: '50px 0 0 50px',
                }}
                className="sidebar-item-link"
            >
                <li className="sidebar-item">
                    <i className={ props.sidebar.icon }></i>
                    <span>{ props.sidebar.label }</span>
                </li>
            </NavLink>
    )
}

export default SidebarItem
