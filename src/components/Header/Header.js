import React, { useState, useEffect, useRef } from 'react';
import {
    Link,
    useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    RiNotification3Line, 
    RiTShirt2Line, 
    RiSearchLine, 
    RiArrowRightSLine, 
    RiArrowLeftSLine, 
    RiBarChartHorizontalLine } from 'react-icons/ri';
import cookies from 'js-cookie';

import actions from '../../redux/actions/user';
import HeaderDropdown from './HeaderDropdown';
import Search from '../Search/Search';
import './Header.css';

function Header({toggleBar}) {
    const userId = cookies.get('userId');

    const { user } = useSelector(state => state.user);
    const { songs } = useSelector(state => state.songs);
    
    const [ isDropdown, setIsDropdown ] = useState(false);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ songSearch, setSongSearch ] = useState([]);
    const [ showSearchModal, setShowSearchModal ] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const ref = useRef(null);

    useEffect(() => {
        dispatch(actions.getUser(userId, history));
    }, [userId])

    const handleChangeSearch = (e) => {
        let arr = [];
        for(let i in songs) {
            if(songs[i].name.toLowerCase().includes(e.target.value)) {
                arr.push(songs[i]);
            }
        }
        setSongSearch(arr);
    }

    const handleLogout = () => {
        dispatch(actions.logout(history));
    }

    const toggleDropdown = () => {
        setIsDropdown(!isDropdown);
        console.log(songSearch)
    }

    const handleToggleBar = () => {
        toggleBar(!isOpen);
    }

    const handleShowSearchModal = () => {
        setShowSearchModal(true);
    }

    const closeSearchModal = (status) => {
        setShowSearchModal(status);
    }

    const handleClickOutside = (e) => {
        if(ref.current && !ref.current.contains(e.target)) {
            toggleBar(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        }
    }, [ref])

    return (
        <div>
            <nav className="navbar">
            <div 
                ref={ref}
                className="toggle-bar-responsive" 
                onClick={handleToggleBar}
            >
                <RiBarChartHorizontalLine/>
            </div>
            <div className="btn-back-control">
                <button 
                    className="btn-back"
                    onClick={ () => history.goBack() }    
                >
                    <RiArrowLeftSLine/>
                </button>
                <button 
                    className="btn-forward"
                    onClick={ () => history.goForward() }    
                >
                    <RiArrowRightSLine/>
                </button>
            </div>
            <div className="search-box">
                <form className="search-form">
                    <input 
                        type="text" 
                        placeholder="Search your songs, artists, album..." 
                        onClick={handleShowSearchModal}
                        onChange={handleChangeSearch}    
                    />
                    <RiSearchLine className="btn-search"/>
                </form>
            </div>
            <div className="auth-box">
            { user ? (
                <div className="user-container">
                    <div className="change-theme-container">
                        <div className="btn-change-theme">
                            <RiTShirt2Line/>
                        </div>
                    </div>
                    <div className="notifications-container">
                        <div className="btn-notification">
                            <RiNotification3Line/>
                        </div>
                    </div>
                    <div className="user-info">
                        <div className="user-avatar" onClick={toggleDropdown}>
                            <img src={user.avatar} alt=""/>
                        </div>
                        {
                            isDropdown === true && <HeaderDropdown logout={handleLogout}/>
                        }
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
        { showSearchModal && <Search songs={songSearch} closeSearchModal={closeSearchModal}/> }
        </div>
    )
}

export default Header;
  