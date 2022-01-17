import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Forbidden } from "../auth/Forbidden";
import { selectLoggedIn, selectToken } from "../auth/loginSlice";
import { publishPost, selectAllUnpublishedPosts } from "./postsSlice";

export const UnpublishedPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllUnpublishedPosts);
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectLoggedIn);


  // Set unpublished status to published
  const attemptPublish = (postId) => {
    try {
      dispatch(publishPost({ postId, token }));
    } catch (err) {
      console.log(err);
    }
  };

  const allPosts = posts.map((post) => (
    <article className="bg-slate-900 p-12 shadow-md" key={post._id}>
      <div className="flex flex-col items-center gap-3">
        <h3 className="text-white/80 font-light text-3xl">{post.title}</h3>
        <p className="text-neutral-400/60 italic">
          posted {post.date.substring(0, 10)}
        </p>
        <Link
          className="text-white font-light bg-cyan-600 px-6 py-1 transition ease-in-out hover:bg-cyan-600/75"
          to={`/posts/${post._id}`}
        >
          View Post
        </Link>
        <button
          type="button"
          className="text-white font-light bg-cyan-600 px-6 py-1 transition ease-in-out hover:bg-cyan-600/75"
          onClick={() => attemptPublish(post._id)}
        >
          Publish
        </button>
      </div>
    </article>
  ));

  let content;
  if (isLoggedIn) {
    content = (
      <section className="w-4/5 max-w-7xl mx-auto flex flex-col items-center gap-10 py-10">
        <h2 className="text-4xl md:text-5xl font-light tracking-wider">
          Unpublished
        </h2>
        <div className="flex flex-col md:grid grid-cols-3 gap-2 px-32">
          {allPosts}
        </div>
      </section>
    );
  } else {
    content = <Forbidden />;
  }

  return content;
};
