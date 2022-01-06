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
            <section>
                <article>
                    <input type='text' value={title} onChange={onTitleChange}></input>
                    <textarea value={text} onChange={onTextChange}></textarea>
                    <button type="button" onClick={attemptEdit}>Submit Edits</button>
                </article>
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