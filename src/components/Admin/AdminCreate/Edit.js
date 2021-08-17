import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { getSong, editSong } from '../../../redux/actions/song';
import './Post.css';

function Edit() {
    const { isLogged } = useSelector(state => state.user);
    const { song } = useSelector(state => state.song);
    const dispatch = useDispatch();
    const history = useHistory();
    const { slug } = useParams();

    const [ isLoading, setLoading ] = useState(false);
    const [ formData, setFormData ] = useState([]);
    const [ error, setError ] = useState({ error: '' });

    if(!isLogged) {
        history.push('/auth/login');
    }

    useEffect(() => {
        dispatch(getSong(slug));
    }, [song])

    const handleSubmitPost = (e) => {
        e.preventDefault();
        setLoading(true);

        if(!formData.name) {
            formData.name = song.name;
        }
        if(!formData.artist) {
            formData.artist = song.artist;
        }
        if(!formData.composer) {
            formData.composer = song.composer;
        }
        if(!formData.type) {
            formData.type = song.type;
        }
        if(!formData.image) {
            formData.image = song.image;
        }
        if(!formData.audio) {
            formData.audio = song.audio;
        }
        if(!formData.lyric) {
            formData.lyric = song.lyric;
        }

        dispatch(editSong(
            formData.name,
            formData.artist,
            formData.composer,
            formData.type,
            formData.image,
            formData.audio,
            formData.lyric,
            song.slug
        ))

        history.push('/admin/store/song');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    
    const handleChangeImage = (e) =>{
        const image = e.target.files[0];
        
        setFormData({
            ...formData,
            image: image
        })
    }

    const handleChangeAudio = (e) =>{
        const audio = e.target.files[0];
        
        setFormData({
            ...formData,
            audio: audio
        })
    }

    const handleCancel = () => {
        setFormData({
            ...formData,
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
                        className="form-post-formData"
                        onSubmit={handleSubmitPost}    
                    >
                        <div className="admin-post-input">
                            <div className="admin-post-title">Edit</div>
                            <label>Song Name</label>
                            <input 
                                type="text" 
                                name="name"
                                defaultValue={song.name}
                                onChange={handleChange}    
                            />
                        </div>
                        <div className="admin-post-input">
                            <label>Artist Name</label>
                            <input 
                                type="text" 
                                name="artist"
                                defaultValue={song.artist}
                                onChange={handleChange}    
                            />
                        </div>
                        <div className="admin-post-input">
                            <label>Composer Name</label>
                            <input 
                                type="text" 
                                name="composer"
                                defaultValue={song.composer}
                                onChange={handleChange}    
                            />
                        </div>
                        <div className="admin-post-input">
                            <label>Types</label>
                            <select 
                                name="type" 
                                id="type" 
                                defaultValue={song.type}
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
                                defaultValue={song.lyric}
                                onChange={handleChange}    
                            ></textarea>
                            <div className="btn-post-box">
                                {/* { !isLoading && (
                                    <button className="btn-post" style={{ padding: '5px 20px'}}>Save</button>
                                )}
                                { isLoading && (
                                    <button className="btn-post" disabled>
                                        <i class="fas fa-spinner fa-spin"></i>
                                        Save
                                    </button>
                                )} */}
                                
                                <button className="btn-post">
                                        <i className="fas fa-spinner fa-spin"></i>
                                        Save
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

export default Edit;
