import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectLoggedIn, logout } from "../features/auth/loginSlice";



export const Navbar = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectLoggedIn);

    const attemptLogout = async () => {
        
        dispatch(logout());
       
    }

    const loginBtn = (!isLoggedIn) ? <Link className="text-xl text-white font-bold absolute right-0 px-5 py-1 bg-sky-500 rounded-lg hover:bg-sky-500/75" to="/login">Login</Link> : <button type='button' className="text-xl text-white font-bold absolute right-0 px-5 py-1 bg-sky-500 rounded-lg hover:bg-sky-500/75" onClick={attemptLogout}>Logout</button>;

    const addPostBtn = (isLoggedIn) ? <Link className="text-xl text-white font-bold absolute left-0 px-5 py-1 bg-sky-500 rounded-lg hover:bg-sky-500/75" to="/posts/new">New Post</Link> : '';
    
    return (
        <header className="p-5">
            <nav className="relative flex justify-center items-center">
                <Link to='/' className="text-8xl">The Blog</Link>
                {addPostBtn}
                {loginBtn}
            </nav>
        </header>
    );
};