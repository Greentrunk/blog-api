import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectPostById } from "./postsSlice";
import { PostComments } from "../comments/PostComments";
import { AddCommentForm } from "../comments/AddCommentForm";

export const SinglePost = () => {
    const {postId} = useParams();
    
    const post = useSelector(state => selectPostById(state, postId));
    
    if (!post) {
        return (
            <article className="h-80 flex justify-center items-center text-4xl">
                <h2>Post does not exist :(</h2>
            </article>
        );
    }

    return (
        <section className="px-32 leading-9">
            <article className="flex flex-col items-center gap-2">
                <h2 className="text-5xl text-center">{post.title}</h2>
                <span className="text-neutral-500 italic">Posted on {post.date.substring(0,10)}</span>
                <p className="indent-8 text-xl">{post.text}</p>
            </article>

            <PostComments postId={postId}/>
            <AddCommentForm postId={postId} />
        </section>
    )
}