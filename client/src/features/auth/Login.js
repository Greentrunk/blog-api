import React from "react";
import { Link } from "react-router-dom";

export const Login = () => {
    return (
        <Link to='/' className="fixed left-0 right-0 top-0 bottom-0 flex flex-col justify-center items-center p-40 bg-black/50">
            <form className="flex flex-col gap-3 w-96">
                <input className="p-3" type='text' value='' placeholder="Username"></input>
                <input className="p-3" type='password' placeholder="Password"></input>
            </form>
        </Link>
    );
}