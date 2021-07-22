import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cookies from 'js-cookie';

import { postComment } from '../../redux/actions/comment';
import { getUser } from '../../apis/user';
import CommentItem from './CommentItem';

function Comment(props) {
    const userId = cookies.get('userId');

    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [ formData, setFormData ] = useState({ content: '' });

    const handleSubmitCmt = async (e) => {
        e.preventDefault();
        
        const status = await postComment(
            formData.content,
            userId,
            props.slug
        )
        if(status === 'success') {
            setFormData({
                content: ''
            })
        }
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
                    <div className="song-detail-recommend-title">
                        Recommend
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment;
