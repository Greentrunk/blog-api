import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { selectPostById, deletePost } from "./postsSlice";
import { selectLoggedIn, selectToken } from "../auth/loginSlice";

import { PostComments } from "../comments/PostComments";
import { AddCommentForm } from "../comments/AddCommentForm";
import { Link } from "react-router-dom";

export const SinglePost = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, postId));
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectLoggedIn);
  const navigate = useNavigate();

  const attemptDelete = async () => {
    try {
      await dispatch(deletePost({ postId, token })).unwrap();
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBtn = isLoggedIn ? (
    <button
      type="button"
      className="text-2xl md:text-3xl font-light tracking-wider underline underline-offset-8 transition ease-in-out hover:text-cyan-600"
      onClick={attemptDelete}
    >
      Delete Post
    </button>
  ) : (
    ""
  );
  const updateBtn = isLoggedIn ? (
    <Link
      to={`/posts/update/${postId}`}
      className="text-2xl md:text-3xl font-light tracking-wider underline underline-offset-8 transition ease-in-out hover:text-cyan-600"
    >
      Update Post
    </Link>
  ) : (
    ""
  );
  if (!post) {
    return (
      <article className="h-80 flex justify-center items-center text-4xl">
        <h2>Post does not exist :(</h2>
      </article>
    );
  }

  return (
    <section className="w-4/5 max-w-7xl mx-auto lg:px-32 py-10 flex flex-col items-center gap-10">
      <article className="flex flex-col items-center gap-2">
        <h2 className="text-4xl md:text-5xl font-light tracking-wider">
          {post.title}
        </h2>
        <span className="text-neutral-500 italic">
          Posted on {post.date.substring(0, 10)}
        </span>
        <p className="indent-8 font-light text-xl md:text-2xl">{post.text}</p>
      </article>
      <div className="flex w-full justify-evenly">
        {deleteBtn}
        {updateBtn}
      </div>

      <PostComments postId={postId} />
      <AddCommentForm postId={postId} />
    </section>
  );
};
