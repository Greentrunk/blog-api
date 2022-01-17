import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./loginSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState(null);

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const canLogin = [username, password].every(Boolean);

  const navigate = useNavigate();

  // If inputs are filled allow submit
  const attemptLogin = async () => {
    if (canLogin) {
      try {
        await dispatch(login({ username, password })).unwrap();
        navigate("/", { replace: true });
      } catch (err) {
        setMessage("Wrong Username or Password");
      }
    }
  };

  return (
    <section className="h- bg-gray-800 login-height">
      <div className="w-4/5 max-w-7xl mx-auto flex flex-col justify-center items-center gap-10 p-40">
        <h2 className="text-5xl font-light tracking-wider text-cyan-600">
          Login
        </h2>
        <form className="flex flex-col gap-10 w-96 px-10 md:px-0">
          <div className="flex flex-col gap-3">
            <input
              className="p-3 border-solid border-cyan-600 border-2"
              type="text"
              value={username}
              onChange={handleUsername}
              placeholder="Username"
            ></input>
            <input
              className="p-3 border-solid border-cyan-600 border-2"
              type="password"
              value={password}
              onChange={handlePassword}
              placeholder="Password"
            ></input>
          </div>
          <button
            type="button"
            className="text-3xl font-light tracking-wider p-1 text-cyan-600 border-solid border-cyan-600 border-2"
            onClick={attemptLogin}
            disabled={!canLogin}
          >
            Submit
          </button>
        </form>
        <p className="w-full text-center font-bold text-red-600 tracking-wider">
          {message}
        </p>
      </div>
    </section>
  );
};
