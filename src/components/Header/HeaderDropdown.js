import React from 'react';
import { Link } from 'react-router-dom';

function HeaderDropdown(props) {
    return (
        <div className="user-dropdown">
            <div className="user-choose">
                <Link to="/profile">
                    <i className="ri-user-line"></i>
                    <span>Profile</span>
                </Link>
            </div>
            <div className="user-choose">
                <Link>
                    <i className="ri-settings-2-line"></i>
                    <span>Setting</span>
                </Link>
            </div>
            <div className="user-logout" onClick={props.logout}>
                <i className="ri-logout-box-line"></i>
                <span>Logout</span>
            </div>
        </div>
    )
}

export default HeaderDropdown;
