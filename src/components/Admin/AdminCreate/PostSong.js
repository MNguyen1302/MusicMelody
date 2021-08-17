import React, { useState } from 'react';
import cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createSong } from '../../../redux/actions/song';
import './Post.css';

function PostSong() {
    const userId = cookies.get('userId');

    const { isLogged } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [ song, setSong ] = useState([]);
    const [ error, setError ] = useState({ error: '' });
    const [ isLoading, setLoading ] = useState(false);

    if(!isLogged) {
        history.push('/auth/login')
    }

    const handleSubmitPost = async (e) => {
        e.preventDefault();
        
        dispatch(createSong(
            song.name,
            song.artist,
            song.composer,
            song.type,
            song.image,
            song.audio,
            song.lyric,
            userId
        ))
        
        history.push('/admin/store/song');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSong({
            ...song,
            [name]: value
        })
    }
    
    const handleChangeImage = (e) =>{
        const image = e.target.files[0];

        setSong({
            ...song,
            image: image
        })
    }

    const handleChangeAudio = (e) =>{
        const audio = e.target.files[0];

        setSong({
            ...song,
            audio: audio
        })
    }

    const handleCancel = () => {
        setSong({
            ...song,
            name: '',
            artist: '',
            composer: '',
            type: '',
            lyric: ''
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
                            <div className="admin-post-title">Add Music</div>
                            <label>Song Name</label>
                            <input 
                                type="text" 
                                name="name"
                                value={song.name}
                                onChange={handleChange}    
                            />
                        </div>
                        <div className="admin-post-input">
                            <label>Artist Name</label>
                            <input 
                                type="text" 
                                name="artist"
                                value={song.artist}
                                onChange={handleChange}    
                            />
                        </div>
                        <div className="admin-post-input">
                            <label>Composer Name</label>
                            <input 
                                type="text" 
                                name="composer"
                                value={song.composer}
                                onChange={handleChange}    
                            />
                        </div>
                        <div className="admin-post-input">
                            <label>Types</label>
                            <select 
                                name="type" 
                                id="type" 
                                value={song.type}
                                className="admin-input-select"
                                onChange={handleChange}    
                            >
                                <option value="">Choose type song</option>
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
                            <label>Song Image</label>
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
                            <label>Song Audio</label>
                            <label className="file-post">
                                <input 
                                    type="file" 
                                    name="audio"
                                    onChange={handleChangeAudio}    
                                />
                                <span className="custom-file-post"></span>
                            </label>
                        </div>
                        <div className="admin-post-input">
                            <label>Song Lyric</label>
                            <textarea 
                                name="lyric" 
                                id="lyric" 
                                cols="30" 
                                rows="10"
                                value={song.lyric}
                                onChange={handleChange}    
                            ></textarea>
                            <div className="btn-post-box">
                                {/* { !isLoading && (
                                    <button className="btn-post" style={{ padding: '5px 20px' }}>Save</button>
                                )}
                                { isLoading && (
                                    <button className="btn-post" disabled>
                                        <i className="fas fa-spinner fa-spin"></i>
                                        Save...
                                    </button>
                                )} */}

                                <button className="btn-post">
                                        <i className="fas fa-spinner fa-spin"></i>
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

export default PostSong;
