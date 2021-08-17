import React,{ useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useComponentVisible from '../../hooks/useComponentVisible';
import { IoMdArrowDropdown } from 'react-icons/io';
import cookies from 'js-cookie';

import actions from '../../redux/actions/playlist';
import Modal from '../Modal/Modal';
import './PopupMore.css';

function PopupMore(props) {
    const userId = cookies.get('userId');

    const { slug } = useParams();
    const { ref } = useComponentVisible(props.isComponentVisible);
    const { playlists } = useSelector(state => state.playlist);

    const [ showModal, setShowModal ] = useState({
        isShow: false,
        playlist: ''
    })

    const dispatch = useDispatch();

    const handleAddToPlaylist = (id, name) => {
        setShowModal({
            isShow: true,
            playlist: name
        })
        dispatch(actions.addToPlaylist(userId, id, slug));
        setTimeout(() => {
            setShowModal({
                ...showModal,
                isShow: false
            })
        }, 3000)
    }

    const handleShowShare = () => {
        props.showShareModal(true);
    }

    return (
        <div 
            className="popup-more" 
            ref={ref} 
            style={{ 
                display: props.isComponentVisible ? 'block' : 'none',
                fontSize: props.fontSize, 
                top: props.top && props.top, 
                right: props.right && props.right
            }}    
        >
            { showModal.isShow && <Modal content={`Add to ${showModal.playlist} playlist`}/> } 
            <ul>
                <li>
                    <span className="popup-more-title">Go to artist</span>
                </li>
                <li>
                    <span className="popup-more-title">Go to album</span>
                </li>
                <li>
                    <span className="popup-more-title">Like Song</span>
                </li>
                <li className="popup-playlist-title">
                    <span className="popup-more-title">Add to playlist <IoMdArrowDropdown/></span>
                    {
                        playlists.length ? (
                            <ul className="popup-playlist">
                                {
                                    playlists.map(playlist => {
                                        return  <li
                                                    key={playlist._id}
                                                    onClick={ () => handleAddToPlaylist(playlist._id, playlist.name) }
                                                >
                                                    {playlist.name}
                                                </li>
                                    })
                                }
                            </ul>
                        ) : null
                    }
                </li>
                <li onClick={handleShowShare}>
                    <span className="popup-more-title">Share</span>
                </li>
            </ul>
        </div>
    )
}

export default PopupMore;
