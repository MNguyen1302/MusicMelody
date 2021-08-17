import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import cookies from 'js-cookie';

import { editProfile } from '../../redux/actions/user';
import avatar from '../../images/noavatar.svg';

function ProfileEdit(props) {
    const userId = cookies.get('userId');
    const dispatch = useDispatch();
    const [ imgSrc, setImgSrc ] = useState('');
    const [ formProfile, setFormProfile ] = useState([]);

    const handleSubmitEdit =  (e) => {
        e.preventDefault();

        if(!formProfile.avatar) {
            formProfile.avatar = props.user.avatar;
        }
        if(!formProfile.firstname) {
            formProfile.firstname = props.user.firstname;
        }
        if(!formProfile.lastname) {
            formProfile.lastname = props.user.lastname;
        }
        if(!formProfile.name) {
            formProfile.name = props.user.name;
        }
        if(!formProfile.email) {
            formProfile.email = props.user.email;
        }
        if(!formProfile.address) {
            formProfile.address = props.user.address;
        }

        dispatch(editProfile(
            formProfile.avatar,
            formProfile.firstname,
            formProfile.lastname,
            formProfile.name,
            formProfile.email,
            formProfile.address,
            userId
        ))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormProfile({
            ...formProfile,
            [name]: value
        })
    }
    const handleChangeImage = (e) => {
        const avatar = e.target.files[0];

        setFormProfile({
            ...formProfile,
            avatar: avatar
        })
        let fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
            setImgSrc(fileReader.result)
        })
        fileReader.readAsDataURL(e.target.files[0])
    }

    return (
        <form 
            className="form-edit"
            onSubmit={handleSubmitEdit}
        >
            <div className="form-edit-avatar">
                {
                    imgSrc ? (
                        <img 
                            src={imgSrc} 
                            alt="user-avatar" 
                            id="image-preview"
                        />  
                    ) : (
                        <img 
                            src={props.user.avatar ? props.user.avatar : avatar} 
                            alt="user-avatar" 
                            id="image-preview"
                        />  
                    )
                }
                <div className="image-edit">
                    <i className="ri-image-edit-line"></i>
                    <input 
                        id="file-upload" 
                        name="avatar" 
                        type="file" 
                        className="file-upload" 
                        onChange={handleChangeImage}
                    />
                </div>
            </div>
            <div className="form-edit-information">
                <div className="input-edit">
                    <label>First Name</label>
                    <input 
                        type="text" 
                        name="firstname" 
                        defaultValue={ props.user.firstname }
                        onChange={handleChange}
                    />
                </div>
                <div className="input-edit">
                    <label>Last Name</label>
                    <input 
                        type="text" 
                        name="lastname" 
                        defaultValue={ props.user.lastname }
                        onChange={handleChange}
                    />
                </div>
                <div className="input-edit">
                    <label>User Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        defaultValue={ props.user.name }
                        onChange={handleChange}
                    />
                </div>
                <div className="input-edit">
                    <label>Email</label>
                    <input 
                        type="text" 
                        name="email" 
                        defaultValue={ props.user.email }
                        onChange={handleChange}
                    />
                </div>
                <div className="input-edit">
                    <label>Address</label>
                    <input 
                        type="text" 
                        name="address" 
                        defaultValue={ props.user.address }
                        onChange={handleChange}
                    />
                </div>
                <div className="btn-handle">
                    <button className="btn-change-profile">Change</button>
                    <a href="#"><button className="btn-cancel">Cancel</button></a>
                </div>
            </div>
        </form>
    )
}

export default ProfileEdit;
