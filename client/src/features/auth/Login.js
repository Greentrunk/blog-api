import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./loginSlice";

export const Login = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState(null);

    const handleUsername = e => setUsername(e.target.value);
    const handlePassword = e => setPassword(e.target.value);

    const canLogin = [username, password].every(Boolean);

    const navigate = useNavigate();

    const attemptLogin = async () => {
        if (canLogin) {
            try {
                await dispatch(login({username, password})).unwrap();
                navigate('/', {replace: true});
            } catch (err) {
                setMessage('Wrong Username or Password');
            }
        }
    }

    return (
        <section className="flex flex-col justify-center items-center p-40 bg-black/50">
            <h2>Login</h2>
            <form className="flex flex-col gap-3 w-96">
                <input className="p-3" type='text' value={username} onChange={handleUsername} placeholder="Username"></input>
                <input className="p-3" type='password' value={password} onChange={handlePassword} placeholder="Password"></input>
                <button type="button" className="" onClick={attemptLogin} disabled={!canLogin}>Submit</button>
            </form>
            <p>{message}</p>
        </section>
    );
}