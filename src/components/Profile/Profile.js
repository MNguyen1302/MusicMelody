import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

import EditForm from './EditForm';
import PasswordForm from './PasswordForm';
import avatar from '../../images/noavatar.svg';
import './Profile.css';

function Profile() {
    const { user, isLogged } = useSelector(state => state.user);
    const history = useHistory();

    const [ indexTab, setIndexTab ] = useState(1);
    const handleTabClick = (index) => {
        setIndexTab(index);
    }

    if(!isLogged) {
        history.push('/auth/login');
    }

    return (
        <div className="profile-container">
            <div className="tabs-profile">
                <div 
                    onClick={ () => handleTabClick(1) }
                    className={ indexTab === 1 ? 'tab-profile-item active' : 'tab-profile-item' }
                >
                    <span>Profile</span>
                </div>
                <div 
                    onClick={ () => handleTabClick(2) }
                    className={ indexTab === 2 ? 'tab-profile-item active' : 'tab-profile-item' }
                >
                    <span>Edit information</span>
                </div>
                <div 
                    onClick={ () => handleTabClick(3) }
                    className={ indexTab === 3 ? 'tab-profile-item active' : 'tab-profile-item' }
                >
                    <span>Change password</span>
                </div>
            </div>
            <div className="tabs-profile-content">
                <div 
                    onClick={ () => handleTabClick(1) }
                    className={ indexTab === 1 ? 'tab-profile-pane active' : 'tab-profile-pane' }
                >
                    <div className="profile-user">
                        <div className="profile-user-avatar">
                            { user.avatar ? (
                                <img src={user.avatar} alt=""/>
                            ) : (
                                <img src={avatar} alt=""/>
                            )}
                        </div>
                        <div className="profile-user-info">
                            <div className="profile-input">
                                <span className="profile-label">User Name</span>
                                <span className="profile-content">{user.name}</span>
                            </div>
                            <div className="profile-input">
                                <span className="profile-label">Contact</span>
                                <span className="profile-content"></span>
                            </div>
                            <div className="profile-input">
                                <span className="profile-label">Address</span>
                                <span className="profile-content">{user.address}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div 
                    onClick={ () => handleTabClick(2) }
                    className={ indexTab === 2 ? 'tab-profile-pane active' : 'tab-profile-pane' }
                >
                    <EditForm user={user}/>
                </div>
                <div 
                    onClick={ () => handleTabClick(3) }
                    className={ indexTab === 3 ? 'tab-profile-pane active' : 'tab-profile-pane' }
                >
                    <PasswordForm/>
                </div>
            </div>
        </div>
    )
}

export default Profile
