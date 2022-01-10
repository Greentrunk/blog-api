import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectLoggedIn } from "../auth/loginSlice";

import { fetchPosts, selectAllPublishedPosts } from "./postsSlice";

export const AllPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPublishedPosts);
  const isLoggedIn = useSelector(selectLoggedIn);
  const postStatus = useSelector((state) => state.posts.status);

  const unpublishedList = isLoggedIn ? (
    <Link
      to={`/posts/unpublished`}
      className="text-3xl font-light tracking-wider underline underline-offset-8 transition ease-in-out hover:text-cyan-600"
    >
      Unpublished Posts
    </Link>
  ) : (
    ""
  );

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const allPosts = posts.map((post) => (
    <article
      className="bg-gray-800 p-12 shadow-md border-solid border-2 border-cyan-600/80"
      key={post._id}
    >
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
      </div>
    </article>
  ));

  return (
    <section className="w-4/5 max-w-7xl mx-auto py-20 flex flex-col items-center gap-10">
      <h2 className="text-4xl md:text-5xl font-light tracking-wider">
        Post Releases
      </h2>
      <div className="flex flex-col md:grid grid-cols-3 gap-5 all-post-padding">
        {allPosts}
      </div>
      {unpublishedList}
    </section>
  );
};
