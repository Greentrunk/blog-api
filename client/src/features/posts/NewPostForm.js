import React, {useState} from "react";
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

    const [post_title, updateTitle] = useState('');
    const [post_text, updateText] = useState('');

    const onTitleChange = e => updateTitle(e.target.value);
    const onTextChange = e => updateText(e.target.value);

    const canSubmit = [post_title, post_text].every(Boolean);

    const attemptNewPost = async () => {
        if (canSubmit) {
            try {
                await dispatch(newPost({post_title, post_text, token})).unwrap();
                navigate('/posts/unpublished', {replace: true});
            } catch (err) {
                console.log(err);
            }
        }
    }

    let content;
    if (!isLoggedIn) {
        content = (<Forbidden/>)
    }
    else {
        content = (
            <section>
                <form>
                    <input type='text' value={post_title} onChange={onTitleChange}></input>
                    <textarea value={post_text} onChange={onTextChange}></textarea>
                    <button type='button' onClick={attemptNewPost} disabled={!canSubmit}>Submit</button>
                </form>
            </section>
        );
    }

    return (
        content
    );
}