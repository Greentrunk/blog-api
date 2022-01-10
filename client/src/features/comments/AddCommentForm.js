import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addNewComment } from "./commentsSlice";

export const AddCommentForm = (props) => {
  const dispatch = useDispatch();

  const [comment_handle, updateHandle] = useState("");
  const [comment_text, updateText] = useState("");

  const onHandleChange = (e) => updateHandle(e.target.value);
  const onTextChange = (e) => updateText(e.target.value);

  const [post] = useState(props.postId);

  const canSubmit = [comment_handle, comment_text].every(Boolean);

  const addComment = async () => {
    if (canSubmit) {
      await dispatch(
        addNewComment({ comment_handle, comment_text, post })
      ).unwrap();
      updateHandle("");
      updateText("");
    }
  };

  return (
    <section className="py-10 flex flex-col gap-10">
      <h2 className="text-4xl md:text-5xl font-light tracking-wider">
        New Comment
      </h2>
      <form className="flex flex-col gap-3">
        <input
          type="text"
          className="p-3 bg-slate-200"
          value={comment_handle}
          onChange={onHandleChange}
          placeholder="Handle"
        ></input>
        <textarea
          className="resize-none p-3 bg-slate-200"
          value={comment_text}
          onChange={onTextChange}
          placeholder="Message"
        ></textarea>
        <button
          className="text-2xl md:text-3xl font-light tracking-wider underline underline-offset-8 transition ease-in-out hover:text-cyan-600"
          type="button"
          onClick={addComment}
          disabled={!canSubmit}
        >
          Submit
        </button>
      </form>
    </section>
  );
};
