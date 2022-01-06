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
    const {postId} = useParams();
    const post = useSelector(state => selectPostById(state, postId));
    const token = useSelector(selectToken);
    const isLoggedIn = useSelector(selectLoggedIn);
    const navigate = useNavigate();

    const attemptDelete = async () => {
        try {
            await dispatch(deletePost({postId, token})).unwrap();
            navigate('/', {replace: true});
        } catch (err) {
            console.log(err);
        }
    }

    const deleteBtn = (isLoggedIn) ? <button type="button" className="text-xl text-white font-bold absolute left-0 px-5 py-1 bg-sky-500 rounded-lg hover:bg-sky-500/75" onClick={attemptDelete}>Delete Post</button> : '';
    const updateBtn = (isLoggedIn) ? <Link to={`/posts/update/${postId}`}>Update Post</Link> : '';
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
            {deleteBtn}
            {updateBtn}
            <PostComments postId={postId}/>
            <AddCommentForm postId={postId} />
        </section>
    )
}