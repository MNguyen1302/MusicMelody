import React, { useState } from 'react';
import { 
    Link,
    useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cookies from 'js-cookie';

import { login } from '../../redux/actions/auth';

import banner from '../../images/banner.png';
import './Authenticate.css';

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}

function SignIn() {
    const userId = cookies.get('userId');
    const [ user, setUser ] = useState(initialState);
    const history = useHistory();
    const dispatch = useDispatch();

    if(userId) {
        history.push('/');
    }
    
    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        
        dispatch(login(user));
    }   
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    return (
        <div className="signinup-container">
            <div className="signinup-wrapper">
                <div className="image-container">
                    <img src={banner} alt="" />
                </div>
                <div className="form-container">
                    <div className="form-wrapper">
                        <div className="form-title">Sign In</div>
                        <form action="" method="POST" onSubmit={handleSubmitLogin}>
                            <div 
                                className="signinup-input"
                            >
                                <label>Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    onChange={handleChange}
                                />
                                <div className="icon-error">
                                    <i className="ri-error-warning-line"></i>
                                </div>
                            </div>
                            <div 
                                className="signinup-input"
                            >
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    onChange={handleChange}
                                />
                                <div className="icon-error">
                                    <i className="ri-error-warning-line"></i>
                                </div>
                            </div>
                            <div className="btn-signin-form">
                                <button id="btn-signin">Login</button>
                            </div>
                        </form>
                        <div className="signinup-status">
                            <span>Don't have any account? <Link to='/auth/register'>Sign Up</Link></span>
                        </div>
                        <Link 
                            to="/auth/google" 
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="signin-with-gg-container">
                                <div className="signin-with-gg-icon">
                                    <i className="ri-google-fill"></i>
                                </div>
                                <div className="signin-with-gg-text">
                                    <span>Sign in with Google</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
