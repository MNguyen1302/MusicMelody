import './App.css';
import React from 'react';
import {
    BrowserRouter as Router, 
    Switch, 
    Route } from 'react-router-dom';

import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import SongDetailPage from './pages/SongDetail/SongDetail';
import CategoryPage from './pages/Category/CategoryPage';
import SongCategoryPage from './pages/Category/SongCategoryPage';

import SignIn from './pages/Authenticate/SignIn';
import SignUp from './pages/Authenticate/SignUp';

function App() {
    return (
        <Router>
            <div className="App">
                <Layout/>
                <Switch>
                    <Route path='/' exact component={Home}></Route>
                    <Route path='/song/:slug' exact component={SongDetailPage}></Route>
                    <Route path='/category' exact component={CategoryPage}></Route>
                    <Route path='/genre/:type' exact component={SongCategoryPage}></Route>
                    <Route path='/auth/login' exact component={SignIn}></Route>
                    <Route path='/auth/register' exact component={SignUp}></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
