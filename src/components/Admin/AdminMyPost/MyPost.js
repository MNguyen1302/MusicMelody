import React from 'react';
import { 
    Link,
    useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import TableSongList from '../Table/TableSongList';
import Loading from '../../Loading/LoadingS1';
import './MyPost.css';

function MyPost() {
    const { isLogged } = useSelector(state => state.user);
    const { songs, loading } = useSelector(state => state.admin);
    const history = useHistory();

    if(!isLogged) {
        history.push('/auth/login');
    }

    return (
        <div className="mypost-container">
            <div className="mypost-wrapper">
                <div className="mypost-center" style={{ overflowX: 'auto' }}>
                    <div className="mypost-title-box">
                        <div className="mypost-title">
                            Song Lists
                        </div>
                        <div className="mypost-add">
                            <Link to='/admin/post/song'>Add new song</Link>
                        </div>
                    </div>
                    <table className="table-mypost">
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Song Cover Image</th>
                                <th>Song Name</th>
                                <th>Artist Name</th>
                                <th>Song Category</th>
                                <th>Composer</th>
                                <th>Time</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {
                                    loading && (
                                        <td colSpan="9" style={{ textAlign: 'center' }}>
                                            <Loading/>
                                        </td>
                                    )
                                }
                            </tr> 
                            {   songs.length ?
                                (songs.map((song, index) => {
                                    return  <TableSongList 
                                                key={index}
                                                index={index + 1}
                                                song={song}
                                            />
                                })) : (
                                    <tr>
                                        <td colSpan="9" style={{ textAlign: 'center' }}>You have no songs yet</td>
                                    </tr> 
                                )
                            }
                                                           
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default MyPost;
