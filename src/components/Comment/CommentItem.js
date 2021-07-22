import React from 'react';
import moment from 'moment';

import avatar from '../../images/noavatar.svg';
import './Comment.css'

function CommentItem({comment}) {
    return (
        <div>
            <hr/>
            <div className="song-detail-comment-box">
                <div className="song-comment-avatar">
                    {
                        comment.userId.avatar ? (
                            <img src={comment.userId.avatar} alt="Avatar"/>
                        ) : (
                            <img src={avatar} alt="No Avatar"/>
                        )
                    }
                </div>
                <div className="song-comment-main">
                    <div className="song-comment-header">
                        <div className="song-comment-username">
                            <span>{comment.userId.name}</span>
                        </div>
                        <div className="song-comment-header-right">
                            <div className="song-comment-time">
                                <span>{moment(comment.date).fromNow()}</span>
                            </div>
                            <div className="song-comment-icon">
                                <i className="ri-heart-fill"></i>
                            </div>
                        </div>
                    </div>
                    <div className="song-comment-content">
                        <span>{comment.content}</span>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default CommentItem
