import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import { Navbar } from "./components/Navbar";
import {Footer} from './components/Footer';
import {Main} from './components/Main';
import { SinglePost } from "./features/posts/SinglePost";
import { Login } from "./features/auth/Login";
import { NewPostForm } from "./features/posts/NewPostForm";
import { UpdatePostForm } from "./features/posts/UpdatePostForm";
import { UnpublishedPosts } from "./features/posts/UnpublishedPosts";
import { NotFound } from "./components/NotFound";

const App = () => {
    return (
        <Router>
            <div className="relative h-screen w-4/5 max-w-6xl mx-auto py-10 bg-gradient-to-r from-slate-200 to-slate-300 shadow-xl overflow-auto no-scrollbar">
                <Navbar />
                <Routes>
                    <Route exact path='/' element={<Main/>}/>
                    <Route exact path='/posts/:postId' element={<SinglePost/>}/>
                    <Route exact path='/login' element={<Login/>}/>
                    <Route exact path='/posts/new' element={<NewPostForm/>}/>
                    <Route exact path='/posts/update/:postId' element={<UpdatePostForm/>}/>
                    <Route exact path='/posts/unpublished' element={<UnpublishedPosts/>}/>
                    <Route path ='*' element={<NotFound/>}/>
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
