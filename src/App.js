import './App.css';
import React from 'react';
import {
    BrowserRouter as Router, 
    Switch, 
    Route } from 'react-router-dom';
import ScrollToTop from './pages/ScollToTop/ScrollToTop';

import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import SongDetailPage from './pages/SongDetail/SongDetail';
import CategoryPage from './pages/Category/CategoryPage';
import SongCategoryPage from './pages/Category/SongCategoryPage';
import ArtistDetailPage from './pages/ArtistDetail/ArtistDetailPage';
import AllSongs from './pages/AllSongs/AllSongs';
import Profile from './pages/Profile/Profile';
import Favourite from './pages/Favourite/Favourite';
import Playlist from './pages/Playlist/Playlist';

import SignIn from './pages/Authenticate/SignIn';
import SignUp from './pages/Authenticate/SignUp';

import Admin_MyPost from './pages/Admin/Admin_MyPost';
import Admin_PostArtist from './pages/Admin/Admin_PostArtist';
import Admin_PostSong from './pages/Admin/Admin_PostSong';
import Admin_Edit from './pages/Admin/Admin_Edit';

function App() {
    return (
        <Router>
            <div className="App">
               
                <Switch>
                    <Route path='/auth/login' exact component={SignIn}></Route>
                    <Route path='/auth/register' exact component={SignUp}></Route>

                    <Route>
                        <Layout/>
                        <ScrollToTop/>
                        <Route path='/' exact component={Home}></Route>
                        <Route path='/song/:slug' exact component={SongDetailPage}></Route>
                        <Route path='/category' exact component={CategoryPage}></Route>
                        <Route path='/genre/:type' exact component={SongCategoryPage}></Route>
                        <Route path='/artist/:slug' exact component={ArtistDetailPage}></Route>
                        <Route path='/allsongs' exact component={AllSongs}></Route>
                        <Route path='/profile' exact component={Profile}></Route>
                        <Route path='/favourites' exact component={Favourite}></Route>
                        <Route path='/playlist/:id' exact component={Playlist}></Route>
                        <Route path='/admin/store/song' exact component={Admin_MyPost}></Route>
                        <Route path='/admin/create/song' exact component={Admin_PostSong}></Route>
                        <Route path='/admin/create/artist' exact component={Admin_PostArtist}></Route>
                        <Route path='/admin/edit/:slug' exact component={Admin_Edit}></Route> 
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
