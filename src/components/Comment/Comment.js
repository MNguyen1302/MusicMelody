import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cookies from 'js-cookie';

import songs from '../../redux/actions/songs';
import song from '../../redux/actions/song';
import Recommend from './Recommend';
import CommentItem from './CommentItem';

function Comment(props) {
    const userId = cookies.get('userId');

    const { user } = useSelector(state => state.user);
    const { trending } = useSelector(state => state.songs);
    const dispatch = useDispatch();
    const history = useHistory();

    const [ formData, setFormData ] = useState({ content: '' });

    useEffect(() => {
        dispatch(songs.getTopSong());
    }, [trending])

    const handleSubmitCmt = async (e) => {
        e.preventDefault();
        
        dispatch(song.postComment(
            formData.content,
            userId,
            props.slug,
            setFormData
        ))
    }

    const handleChange = (e) => {
        setFormData({
            content: e.target.value
        })
    }

    const handleClickInput = () => {
        if(!user) history.push('/auth/login');
    }

    return (
        <div className="song-detail-extra-container">
            <div className="song-detail-extra-wrapper">
                <div className="song-detail-comment-container">
                    <div className="song-detail-comment-title">{props.comments.length} {props.comments.length > 1 ? 'Comments' : 'Comment'}</div>
                    <div className="form-comment">
                        <form onSubmit={handleSubmitCmt}>
                            <textarea 
                                name="content" 
                                cols="30" 
                                rows="10" 
                                placeholder="Comment here"
                                value={formData.content}
                                onClick={handleClickInput}
                                onChange={handleChange}    
                            ></textarea>
                            <div className="btn-send-comment">
                                <button id="btn-send-comment" disabled={ !user ? true : false}>Send</button>
                            </div>
                        </form>
                    </div>
                    <div className="song-detail-comment">
                        {
                            props.comments.length ? 
                            (
                                props.comments.map(comment => {
                                    return  <CommentItem 
                                                key={comment._id}
                                                comment={comment}
                                            />
                                })
                            ) : (
                                <div className="song-detail-comment-status">
                                    <span>Don't have any comments for this song</span>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="song-detail-recommend">
                    <div className="song-recommend-title">
                        <span>Recommend</span>
                    </div>
                    <div className="song-recommend-container">
                        {
                            trending.slice(0, 5).map(song => {
                                return  <Recommend
                                            key={song._id}
                                            song={song}
                                        />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment;
