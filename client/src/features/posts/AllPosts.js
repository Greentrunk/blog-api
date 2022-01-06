import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { selectLoggedIn } from "../auth/loginSlice";

import { fetchPosts, selectAllPublishedPosts } from "./postsSlice";

export const AllPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPublishedPosts);
    const isLoggedIn = useSelector(selectLoggedIn);
    const postStatus = useSelector(state => state.posts.status);

    const unpublishedList = (isLoggedIn) ? <Link to={`/posts/unpublished`}>Unpublished Posts</Link> : '';

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    const allPosts = posts.map(post => (
        <article className="bg-slate-900 rounded-xl p-12 shadow-md" key={post._id}>
            <div className="flex flex-col items-center gap-3">
                <h3 className="text-white text-3xl">{post.title}</h3>
                <p className="text-neutral-500 italic">posted {post.date.substring(0,10)}</p>
                <Link className="text-white bg-sky-500/50 px-6 py-1 rounded-lg hover:bg-sky-500/75" to={`/posts/${post._id}`}>View Post</Link>
            </div>
        </article>
    ));

    return (
        <section>
            <h2 className="text-5xl text-center mb-10">Posts</h2>
            <div className="grid grid-cols-3 gap-2 px-32">
                {allPosts}
            </div>
            {unpublishedList}
        </section>
    );
}