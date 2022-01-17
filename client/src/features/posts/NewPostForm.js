import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectLoggedIn } from "../auth/loginSlice";
import { newPost } from "./postsSlice";

import { Forbidden } from "../auth/Forbidden";
import { useNavigate } from "react-router-dom";

export const NewPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectLoggedIn);

  const [post_title, updateTitle] = useState("");
  const [post_text, updateText] = useState("");

  const onTitleChange = (e) => updateTitle(e.target.value);
  const onTextChange = (e) => updateText(e.target.value);

  const canSubmit = [post_title, post_text].every(Boolean);

  // If inputs are filled allow user to submit
  const attemptNewPost = async () => {
    if (canSubmit) {
      try {
        await dispatch(newPost({ post_title, post_text, token })).unwrap();
        navigate("/posts/unpublished", { replace: true });
      } catch (err) {
        console.log(err);
      }
    }
  };

  let content;
  if (!isLoggedIn) {
    content = <Forbidden />;
  } else {
    content = (
      <section className="w-4/5 max-w-7xl mx-auto py-10 flex flex-col items-center gap-10">
        <h2 className="text-4xl md:text-5xl font-light tracking-wider">
          Add New Unpublished Post
        </h2>
        <form className="flex flex-col gap-3 w-full">
          <input
            type="text"
            className="p-3 bg-slate-200"
            value={post_title}
            onChange={onTitleChange}
            placeholder="Post Title"
          ></input>
          <textarea
            value={post_text}
            className="resize-none p-3 bg-slate-200"
            onChange={onTextChange}
            placeholder="Post Text"
          ></textarea>
          <button
            type="button"
            className="text-2xl md:text-3xl font-light tracking-wider underline underline-offset-8"
            onClick={attemptNewPost}
            disabled={!canSubmit}
          >
            Submit
          </button>
        </form>
      </section>
    );
  }

  return content;
};
