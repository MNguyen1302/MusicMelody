import React, { useState, useEffect } from 'react';
import {
    Link,
    useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';
import cookies from 'js-cookie';

import { getUser, logout } from '../../redux/actions/user';
import avatar from '../../images/noavatar.svg';
import HeaderDropdown from './HeaderDropdown';
import './Header.css';

function Header() {
    const token = localStorage.getItem('userToken');
    const userId = cookies.get('userId');

    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime() || !decodedToken) handleLogout();
        } else {
            handleLogout()
        }
        dispatch(getUser(userId, history));
        
    }, [userId])

    const handleLogout = () => {
        dispatch(logout(history));
        return;
    }

    const [ isDropdown, setIsDropdown ] = useState(false);

    const toggleDropdown = () => {
        setIsDropdown(!isDropdown);
    }
    let dropdown = isDropdown === true ? <HeaderDropdown logout={handleLogout}/> : '';

    return (
        <nav className="navbar">
            <div className="toggle-bar-responsive">
                <i className="ri-bar-chart-horizontal-line"></i>
            </div>
            <div className="btn-back-control">
                <button 
                    className="btn-back"
                    onClick={ () => history.goBack() }    
                >
                    <i className="ri-arrow-left-line"></i>
                </button>
                <button 
                    className="btn-forward"
                    onClick={ () => history.goForward() }    
                >
                    <i className="ri-arrow-right-line"></i>
                </button>
            </div>
            <div className="search-box">
                <form className="search-form">
                    <input type="search" placeholder="Search here..." />
                    <i className="ri-search-line btn-search"></i>
                </form>
            </div>
            <div className="auth-box">
            { user ? (
                <div className="user-container">
                    <div className="change-theme-container">
                        <div className="btn-change-theme">
                            <i className="ri-t-shirt-2-line"></i>
                        </div>
                    </div>
                    <div className="notifications-container">
                        <div className="btn-notification">
                            <i className="ri-notification-3-line"></i>
                        </div>
                    </div>
                    <div className="user-info">
                        <div className="user-avatar" onClick={toggleDropdown}>
                            { user.avatar ? (
                                <img src={user.avatar} alt=""/>
                            ) : (
                                <img src={avatar} alt="" /> 
                            ) }
                        </div>
                        {dropdown}
                    </div>
                </div>
            ) : (
                user === null && (
                    <div className="btn-signin">
                        <Link to='/auth/login' className="signin-link">
                            Sign In
                        </Link>
                        <Link to='/auth/register' className="signup-link">
                            <button>Sign Up</button>
                        </Link>
                    </div>
                )
            ) }
                
            </div>
        </nav>
    )
}

export default Header;
  