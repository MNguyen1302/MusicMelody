import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import actions from '../../../redux/actions/artist';
import { FaSpinner } from 'react-icons/fa';
import './Post.css';

function PostArtist() {
    const { isLogged } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [ artist, setArtist ] = useState([]);
    const [ error, setError ] = useState({ error: '' });
    const [ isLoading, setLoading ] = useState(false);

    if(!isLogged) {
        history.push('/auth/login')
    }

    const handleSubmitPost = (e) => {
        e.preventDefault();
        setLoading(true);

        dispatch(actions.createArtist(
            artist.name,
            artist.genre,
            artist.image,
            artist.description,
        ))
        history.push('/admin/store/song');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArtist({
            ...artist,
            [name]: value
        })
    }
    
    const handleChangeImage = (e) =>{
        const image = e.target.files[0];
        
        setArtist({
            ...artist,
            image: image
        })
    }

    const handleCancel = () => {
        setArtist({
            ...artist,
            name: '',
            genre: '',
            description: ''
        })
    }
    return (
        <div className="admin-post-container">
            <div className="admin-post-wrapper">
                <div className="admin-post-center">
                    <form 
                        className="form-post-song"
                        onSubmit={handleSubmitPost}    
                    >
                        <div className="admin-post-input">
                            <div className="admin-post-title">Add Artist</div>
                            <label>Artist Name</label>
                            <input 
                                type="text" 
                                name="name"
                                value={artist.name}
                                onChange={handleChange}    
                            />
                        </div>
                        <div className="admin-post-input">
                            <label>Genres</label>
                            <select 
                                name="genre" 
                                id="genre" 
                                value={artist.genre}
                                className="admin-input-select"
                                onChange={handleChange}    
                            >
                                <option value="">Choose genre</option>
                                <option value="classical">Classical</option>
                                <option value="country">Country</option>
                                <option value="edm">Electronic dance music (EDM)</option>
                                <option value="hiphop">Hip-hop</option>
                                <option value="jazz">Jazz</option>
                                <option value="kpop">Kpop</option>
                                <option value="pop">Pop</option>
                                <option value="rap">Rap</option>
                                <option value="r&b">Rhythm & blues (R&B)</option>
                                <option value="rock">Rock</option>
                            </select>
                        </div>
                        <div className="admin-post-input">
                            <label>Artist Image</label>
                            <label className="file-post">
                                <input 
                                    type="file" 
                                    name="image"
                                    onChange={handleChangeImage}    
                                />
                                <span className="custom-file-post"></span>
                            </label>
                        </div>
                        <div className="admin-post-input">
                            <label>Description</label>
                            <textarea 
                                name="description" 
                                id="lyric" 
                                cols="30" 
                                rows="10"
                                value={artist.description}
                                onChange={handleChange}    
                            ></textarea>
                            <div className="btn-post-box">
                                {/* { !isLoading && (
                                    <button className="btn-post" style={{ padding: '5px 20px' }}>Save</button>
                                )}
                                { isLoading && (
                                    <button className="btn-post" disabled>
                                        <FaSpinner/>
                                        Save...
                                    </button>
                                )} */}
                                <button className="btn-post">
                                    <FaSpinner/>
                                    Save...
                                </button>
                                <button 
                                    className="btn-cancel"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostArtist
