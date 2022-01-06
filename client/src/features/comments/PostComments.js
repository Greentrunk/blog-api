import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCommentsForPost, fetchComments, deleteComment} from "./commentsSlice";
import { selectLoggedIn, selectToken } from "../auth/loginSlice";

export const PostComments = (props) => {
    const dispatch = useDispatch();
    const post = props.postId;
    const comments = useSelector(state => selectAllCommentsForPost(state, post));
    const commentsStatus = useSelector(state => state.comments.status);
    const token = useSelector(selectToken);
    const isLoggedIn = useSelector(selectLoggedIn);
    const attemptDelete = async (commentId) => {
        try {
            await dispatch(deleteComment({commentId, token})).unwrap();
        } catch (err) {
            console.log(err);
        }
    }

    const deleteBtn = (commentId) => (isLoggedIn) ? <button type="button" className="text-xl text-white font-bold absolute left-0 px-5 py-1 bg-sky-500 rounded-lg hover:bg-sky-500/75" onClick={() => attemptDelete(commentId)}>Delete Comment</button> : '';

    useEffect(() => {
        if (commentsStatus === 'idle') {
            dispatch(fetchComments({post}));
        }
    }, [commentsStatus, dispatch, post]);

    if (commentsStatus === 'failed' || comments.length===0) {
        return (
            <article className="h-80 flex justify-center items-center text-xl">
                <h2>No Comments yet!</h2>
            </article>
        );
    }

    const allComments = comments.slice(0, 10).map(comment => (
        <article className="w-full bg-slate-200 rounded-3xl flex flex-col p-4" key={comment._id}>
            <div className="flex justify-between">
                <p className="text-neutral-500">posted by <span className="text-neutral-500 italic">{comment.handle}</span></p>
                <p className="text-neutral-500">on <span className="text-neutral-500 italic">{comment.timestamp.substring(0, 10)}</span> at <span className="text-neutral-500 italic">{comment.timestamp.substring(11,16)}</span></p>
            </div>
            <p className="text-center">{comment.text}</p>
            
            {deleteBtn(comment._id)}
        </article>
    ));



    return (
        <section className="mt-6">
            <h2 className="text-5xl text-center mb-10">Comments</h2>
            <div className="flex flex-col items-center gap-4">
                {allComments}
            </div>
           
        </section>
    )
}