import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllCommentsForPost,
  fetchComments,
  deleteComment,
} from "./commentsSlice";
import { selectLoggedIn, selectToken } from "../auth/loginSlice";

export const PostComments = (props) => {
  const dispatch = useDispatch();
  const post = props.postId;
  const comments = useSelector((state) =>
    selectAllCommentsForPost(state, post)
  );
  const commentsStatus = useSelector((state) => state.comments.status);
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectLoggedIn);

  // Attempt to delete comment
  const attemptDelete = async (commentId) => {
    try {
      await dispatch(deleteComment({ commentId, token })).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  // If admin is logged in show delete button
  const deleteBtn = (commentId) =>
    isLoggedIn ? (
      <button type="button" onClick={() => attemptDelete(commentId)}>
        <i className="fas fa-times text-cyan-600/75 transition ease-in-out hover:text-red-500"></i>
      </button>
    ) : (
      ""
    );

  // Fetch post comments from server
  useEffect(() => {
    if (commentsStatus === "idle") {
      dispatch(fetchComments({ post }));
    }
  }, [commentsStatus, dispatch, post]);

  if (commentsStatus === "failed" || comments.length === 0) {
    return (
      <article className="h-80 flex justify-center items-center text-xl">
        <h2>No Comments yet!</h2>
      </article>
    );
  }

  const allComments = comments.slice(0, 10).map((comment) => (
    <article
      className="relative w-full bg-slate-200 flex flex-col p-4"
      key={comment._id}
    >
      <div className="flex justify-between">
        <p className="text-neutral-500 text-sm md:text-md">
          posted by{" "}
          <span className="text-neutral-500 italic">{comment.handle}</span>
        </p>
        <div className="flex gap-3 items-center">
          <p className="text-neutral-500 text-sm md:text-md">
            on{" "}
            <span className="text-neutral-500 italic">
              {comment.timestamp.substring(0, 10)}
            </span>{" "}
            at{" "}
            <span className="text-neutral-500 italic">
              {comment.timestamp.substring(11, 16)}
            </span>
          </p>
          {deleteBtn(comment._id)}
        </div>
      </div>
      <p className="text-center tracking-wider text-md md:text-lg">
        {comment.text}
      </p>
    </article>
  ));

  return (
    <section className="mt-6 w-full md:px-32 py-10 flex flex-col items-center gap-10">
      <h2 className="text-4xl md:text-5xl font-light tracking-wider">
        Comments
      </h2>
      <div className="flex flex-col items-center gap-4 w-full">
        {allComments}
      </div>
    </section>
  );
};
