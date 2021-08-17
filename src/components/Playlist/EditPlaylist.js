import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import actions from '../../redux/actions/playlist';
import cookies from 'js-cookie';
import { RiCloseLine, RiEditFill } from 'react-icons/ri';

function EditPlaylist(props) {
    const userId = cookies.get('userId');

    const inputRef = useRef(null);
    const dispatch = useDispatch();

    const [ formPlaylist, setFormPlaylist ] = useState([]);
    const [ imgPreview, setImgPreview ] = useState('');

    const handleClosePopup = () => {
        props.closePopup(false);
    }

    const handleFileInput = () => {
        inputRef.current.click();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.updatePlaylist(userId, props.id, formPlaylist));
        props.closePopup(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormPlaylist({
            ...formPlaylist,
            [name]: value
        })
    }

    const handleChangeImage = (e) => {
        const image = e.target.files[0];
    
        setFormPlaylist({
            ...formPlaylist,
            image: image
        })

        let fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
            setImgPreview(fileReader.result)
        })
        fileReader.readAsDataURL(e.target.files[0])
    }

    return ( 
        <div className="edit-popup-background">
            <div className="edit-popup-wrapper">
                <div className="edit-popup-title">
                    <span>Edit</span>
                    <span><RiCloseLine onClick={handleClosePopup}/></span>
                </div>
                <form className="edit-popup-form" onSubmit={handleSubmit}>
                    <div className="edit-popup-container">
                        <div className="edit-popup-upload">
                            <div className="edit-popup-image">
                                <img src={imgPreview ? imgPreview : props.playlist.image} alt=""/>
                                <div className="edit-popup-click">
                                    <RiEditFill onClick={handleFileInput}/>
                                </div>
                                <input 
                                    type="file" 
                                    id="file" 
                                    name="image"
                                    ref={inputRef}
                                    style={{ display: 'none' }} 
                                    onChange={handleChangeImage}
                                />
                            </div>
                        </div>
                        <div className="edit-popup-input-container">
                            <div className="edit-popup-input">
                                <label>Name</label>
                                <input 
                                    type="text" 
                                    defaultValue={props.playlist.name}
                                    name="name"
                                    onChange={handleChange}    
                                /> 
                            </div>
                            <div className="edit-popup-input">
                                <label>Description</label>
                                <textarea 
                                    name="description"
                                    placeholder="Write your description..."    
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="btn-edit-popup">
                        <button>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditPlaylist;
