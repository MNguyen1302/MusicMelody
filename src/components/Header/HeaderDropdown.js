import React from 'react';
import { Link } from 'react-router-dom';
import { RiUserLine, RiSettings2Line, RiLogoutBoxLine } from 'react-icons/ri'

function HeaderDropdown(props) {
    return (
        <div className="user-dropdown">
            <div className="user-choose">
                <Link 
                    to="/profile"
                >
                    <RiUserLine/>
                    <span>Profile</span>
                </Link>
            </div>
            <div className="user-choose">
                <Link>
                    <RiSettings2Line/>
                    <span>Setting</span>
                </Link>
            </div>
            <div className="user-logout" onClick={props.logout}>
                <RiLogoutBoxLine/>
                <span>Logout</span>
            </div>
        </div>
    )
}

export default HeaderDropdown;
