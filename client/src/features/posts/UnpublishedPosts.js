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

    const attemptPublish = (postId) => {
        try {
            dispatch(publishPost({postId, token}))
        } catch (err) {
            console.log(err);
        }  
    }

    const allPosts = posts.map(post => (
        <article className="bg-slate-900 rounded-xl p-12 shadow-md" key={post._id}>
            <div className="flex flex-col items-center gap-3">
                <h3 className="text-white text-3xl">{post.title}</h3>
                <p className="text-neutral-500 italic">posted {post.date.substring(0,10)}</p>
                <Link className="text-white bg-sky-500/50 px-6 py-1 rounded-lg hover:bg-sky-500/75" to={`/posts/${post._id}`}>View Post</Link>
                <button type="button" className="text-white bg-sky-500/50 px-6 py-1 rounded-lg hover:bg-sky-500/75" onClick={() => attemptPublish(post._id)}>Publish</button>
            </div>
        </article>
    ));

    let content;
    if (isLoggedIn) {
        content = (
            <section>
                <h2 className="text-5xl text-center mb-10">Unpublished</h2>
                <div className="grid grid-cols-3 gap-2 px-32">
                    {allPosts}
                </div>
            </section>
        )
    }
    else {
        content = <Forbidden />;
    }

    return (
        content
    )
}