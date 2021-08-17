import React, { useState } from 'react';
import { 
    Link,
    useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import actions from '../../redux/actions/auth';
import banner from '../../images/banner.png';
import './Authenticate.css';

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}

function SignUp() {
    const { isLogged } = useSelector(state => state.user);
    const [ user, setUser ] = useState(initialState);
    const [ errors, setErrors ] = useState([]);

    const history = useHistory();
    const dispatch = useDispatch();

    if(isLogged) {
        history.push('/');
    }
    
    const handleSubmitRegister = async (e) => {
        e.preventDefault();

        dispatch(actions.register(user, history));
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
                    <img 
                        src={banner} 
                        alt="" 
                    />
                </div>
                <div className="form-container">
                    <div className="form-signup-wrapper">
                        <div className="form-title">Sign Up</div>
                        <form 
                            action="" 
                            method="POST" 
                            onSubmit={handleSubmitRegister}
                        >
                            <div className="signinup-input">
                                <label>Username</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={user.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="signinup-input">
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    name="email" 
                                    value={user.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="signinup-input">
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={user.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="signinup-input">
                                <label>Confirm Password</label>
                                <input 
                                    type="password" 
                                    name="confirmPassword" 
                                    value={user.confirmpassword}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="btn-signin-form">
                                <button id="btn-signin">Sign Up</button>
                            </div>
                        </form>
                        <div className="signinup-status">
                            <span>You have an account? <Link to='/auth/login'>Sign In</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
