import React from 'react';
import {Route} from 'react-router-dom';
import Post from './components/post';
import Home from './components/home';
import Navbar from './components/navbar';
import CreatePost from './components/createpost'

function App() {
    return (
        <div>
            <Navbar/>
            <Route path="/" exact component={Home} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="/createpost" exact component={CreatePost} />
        </div>
            

    );
}

export default App;
