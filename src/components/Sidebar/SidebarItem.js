import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineUnorderedList } from 'react-icons/ai';

function SidebarItem(props) {
    return (
            <NavLink
                to={{ 
                    pathname: props.sidebar.url ? props.sidebar.url : `/playlist/${props.sidebar._id}`
                }}
                exact={true}
                activeStyle={{
                    color: 'white',
                    background: '#73d99f',
                    borderRadius: '50px 0 0 50px',
                }}
                title={props.sidebar.label ? props.sidebar.label : props.sidebar.name }
                className="sidebar-item-link"
            >
                <li className="sidebar-item">
                    { props.sidebar.icon ? props.sidebar.icon : <AiOutlineUnorderedList/>}
                    <span>{ props.sidebar.label ? props.sidebar.label : props.sidebar.name }</span>
                </li>
            </NavLink>
    )
}

export default SidebarItem
