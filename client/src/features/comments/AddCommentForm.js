import React, {useState} from "react";
import {useDispatch} from "react-redux";

import {addNewComment} from "./commentsSlice";

export const AddCommentForm =(props) => {
    const dispatch = useDispatch();

    const [comment_handle, updateHandle] = useState('');
    const [comment_text, updateText] = useState('');

    const onHandleChange = e => updateHandle(e.target.value);
    const onTextChange = e => updateText(e.target.value);

    const [post] = useState(props.postId);

    const canSubmit = [comment_handle, comment_text].every(Boolean);

    

    const addComment = async () => {
        if (canSubmit) {
            await dispatch(addNewComment({comment_handle, comment_text, post})).unwrap();
            updateHandle('');
            updateText('');
        }
    }
    
    return (
        <section className="my-6">
            <h2 className="text-5xl text-center mb-10">New Comment</h2>
            <form className="flex flex-col gap-3">
                <input type='text' className="px-3" value={comment_handle} onChange={onHandleChange} placeholder="Handle"></input>
                <textarea className="resize-none px-3" value={comment_text} onChange={onTextChange} placeholder="Message"></textarea>
                <button className="text-xl text-white font-bold bg-sky-500 rounded-lg hover:bg-sky-500/75" type="button" onClick={addComment} disabled={!canSubmit}>Submit</button>
            </form>
        </section>
    );
}