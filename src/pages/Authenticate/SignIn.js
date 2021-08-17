
import React, { useState } from 'react';
import { 
    Link,
    useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGoogleLogin } from 'react-google-login';

import { FcGoogle } from 'react-icons/fc';
import actions from '../../redux/actions/auth';
import banner from '../../images/banner.png';
import './Authenticate.css';

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const clientId = '830776582006-4aaa58498g4atgvqij6cbk4lob513bc7.apps.googleusercontent.com';

function SignIn() {
    const { isLogged } = useSelector(state => state.user)
    const [ user, setUser ] = useState(initialState);
    const history = useHistory();
    const dispatch = useDispatch();

    if(isLogged) {
        history.push('/');
    }
    
    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        
        dispatch(actions.login(user, history));
    }   
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    const onSuccess = async (res) => {
        dispatch(actions.loginGoogle(res.tokenId));
        history.push('/');
    }

    const onFailure = (res) => {
        console.log(res);
    }

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline'
    })

    return (
        <div className="signinup-container">
            <div className="signinup-wrapper">
                <div className="image-container">
                    <img src={banner} alt="" />
                </div>
                <div className="form-container">
                    <div className="form-wrapper">
                        <div className="form-title">Sign In</div>
                        <form onSubmit={handleSubmitLogin}>
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
                            <div 
                                className="signin-with-gg-container"
                                onClick={signIn}    
                            >
                                <div className="signin-with-gg-icon">
                                    <FcGoogle className="google-icon"/>
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

export default SignIn;