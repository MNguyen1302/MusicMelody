import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import cookies from 'js-cookie';
import { changePassword } from '../../redux/actions/user';

function FormChangePass() {
    const userId = cookies.get('userId');
    const dispatch = useDispatch();
    const [ newPassword, setNewPassword ] = useState([]);
    const [ error, setError ] = useState({ error: '' });

    const handleSubmitChangePass = async (e) => {
        e.preventDefault();
        const formData = {
            password: newPassword.password,
            currentpassword: newPassword.currentpassword,
            confirmpassword: newPassword.confirmpassword
        }

        if(!newPassword.password || !newPassword.currentpassword || !newPassword.confirmpassword) {
            setError({
                error: 'One field is required'
            })
            return;
        }
        if(newPassword.password !== newPassword.confirmpassword) {
            setError({
                error: 'Confirm password is not matching'
            })
            return;
        }
        dispatch(changePassword(userId, formData));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPassword({
            ...newPassword,
            [name]: value
        })
    }
    return (
        <form onSubmit={handleSubmitChangePass}>
            <div className="input-edit">
                <label>Current Password</label>
                <input 
                    type="password" 
                    name="currentpassword"
                    value={newPassword.currentpassword}
                    onChange={handleChange}
                />
            </div>
            <div className="input-edit">
                <label>New Password</label>
                <input 
                    type="password" 
                    name="password"
                    value={newPassword.password}
                    onChange={handleChange}    
                />
            </div>
            <div className="input-edit">
                <label>Confirm Password</label>
                <input 
                    type="password" 
                    name="confirmpassword"
                    value={newPassword.confirmpassword}
                    onChange={handleChange}
                />
            </div>
            <div className="btn-handle">
                <button className="btn-change-profile">Change</button>
                <a href="#"><button className="btn-cancel">Cancel</button></a>
            </div>
        </form>
    )
}

export default FormChangePass;
