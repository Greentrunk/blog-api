import React from "react";

export const Navbar = () => {

    return (
        <header className="p-5">
            <nav className="relative flex justify-center items-center">
                <a href='/' className="text-8xl">The Blog</a>
                <a className="text-xl text-white font-bold absolute right-0 px-5 py-1 bg-sky-500 rounded-lg hover:bg-sky-500/75" href="/login">Login</a>
            </nav>
        </header>
    );
};