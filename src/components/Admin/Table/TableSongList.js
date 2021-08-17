import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import actions from '../../../redux/actions/admin';
import { RiEditBoxLine, RiDeleteBin6Line } from 'react-icons/ri';

function TableSong({song, index}) {
    const dispatch = useDispatch();
    const [ isOpen, setIsOpen ] = useState(false);

    const handleClickBtn = () => {
        setIsOpen(!isOpen);
    }

    const closePopup = () => {
        setIsOpen(!isOpen);
    }

    const handleDeleteSong = (id) => {
        dispatch(actions.deleteSong(id));
        document.getElementById(id).remove();
    }

    return (
        <tr
            id={song._id}    
        >
            <td className="td-index">{index}</td>
            <td className="td-image">
                <img src={song.image} alt=""/>
            </td>
            <td>{song.name}</td>
            <td>{song.artist}</td>
            <td>{song.type}</td>
            <td>{song.composer}</td>
            <td>{moment(song.createdAt).format('lll')}</td>
            <td className="td-action">
                <Link 
                    to={'/admin/edit/' + song.slug}
                    style={{ color: 'lightgreen'}}
                >
                    <RiEditBoxLine/>
                </Link>
            </td>
            <td className="td-action">
                <button className="btn-delete" onClick={handleClickBtn}>
                    <RiDeleteBin6Line/>
                </button>
                <div 
                    className='popup-delete-post' 
                    style={{ display: isOpen ? 'block' : 'none' }}
                >
                    <div className="delete-popup-content">
                        Do you want to delete this song?
                    </div>
                    <div className="btn-choose">
                        <button 
                            className="btn-yes"
                            onClick={ () => handleDeleteSong(song._id) }
                        >
                            Yes
                        </button>
                        <button 
                            className="btn-no"
                            onClick={closePopup}
                        >
                            No
                        </button>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default TableSong
