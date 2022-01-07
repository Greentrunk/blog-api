import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Forbidden } from "../auth/Forbidden";
import { selectLoggedIn, selectToken } from "../auth/loginSlice";
import { selectPostById, updatePost } from "./postsSlice";

export const UpdatePostForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {postId} = useParams();
    const post = useSelector(state => selectPostById(state, postId));
    const token = useSelector(selectToken);
    const isLoggedIn = useSelector(selectLoggedIn);

    const [title, updateTitle] = useState(post.title);
    const [text, updateText] = useState(post.text);

    const onTitleChange = e => updateTitle(e.target.value);
    const onTextChange = e => updateText(e.target.value);

    const attemptEdit = async () => {
        try {
            dispatch(updatePost({postId, token, post_title: title, post_text: text})).unwrap();
            navigate(`/posts/${postId}`, {replace: true});
        } catch (err) {
            console.log(err);
        }    
    }

    let content;
    if (isLoggedIn) {
        content = (
            <section className="w-4/5 max-w-7xl mx-auto py-10 flex flex-col items-center gap-10">
                <h2 className="text-5xl font-light tracking-wider">Update Post <span className="italic">{post.title}</span></h2>
                <form className="flex flex-col gap-3 w-full">
                    <input type='text' className="p-3 bg-slate-200" value={title} onChange={onTitleChange}></input>
                    <textarea value={text} className="resize-none p-3 bg-slate-200" onChange={onTextChange}></textarea>
                    <button type="button" className="text-3xl font-light tracking-wider" onClick={attemptEdit}>Submit Edits</button>
                </form>
            </section>
        )
    }
    else {
        content = <Forbidden />
    }

    return (
        content
    )
}