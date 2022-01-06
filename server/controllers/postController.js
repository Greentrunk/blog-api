import Post from '../models/post.js';
import Comment from '../models/comment.js';

import {body, validationResult} from 'express-validator';

// List of All Posts GET
export const posts_get = async (req, res) => {
    try {
        const allPosts = await Post.find();
        res.status(200).json(allPosts);
    } catch (err) {
        res.status(404).json({ message: err.message});
    }
};

// Post comments GET
export const post_comments_get = async (req, res) => {
    try {
        const comments = await Comment.find(req.body.post).sort({timestamp: -1});
        res.status(200).json(comments);
    } catch (err) {
        res.status(404).json({ message: err.messsage});
    }
}

// Create Post POST
export const new_post_post = [
    //Sanitation and Validation
    body('post_title').trim().notEmpty().escape(),
    body('post_text').trim().notEmpty().escape(),

    // Process
    async (req, res) => {

        // Error handling
        const errors = validationResult(req);
        if (!errors.isEmpty()) res.status(400).json(errors.array());
        else {
            // Create post
            const post = new Post(
                {
                    title: req.body.post_title,
                    text: req.body.post_text,
                    date: Date.now(),
                    published: false,
                }
            );
            
            try {
                 const newPost = await post.save()
                 res.status(200).json(newPost);
            } catch (err) {
                res.status(404).json({ message: err.message})
            }
        }
    }
]

export const new_comment_post = [
    //Sanitation and Validation
    body('comment_handle').trim().notEmpty().escape(),
    body('comment_text').trim().notEmpty().escape(),

    // Process
    async (req, res) => {

        // Error handling
        const errors = validationResult(req);

        if (!errors.isEmpty()) res.status(400).json(errors.array());

        else {
            // Get Post
            try {
                const post = await Post.findById(req.body.post);
                // Create comment
                const comment = new Comment(
                    {
                        handle: req.body.comment_handle,
                        text: req.body.comment_text,
                        timestamp: Date.now(),
                        post: post,
                    }
                );

                try {
                    const newComment = await comment.save()
                    res.status(200).json(newComment);
                } catch (err) {
                    res.status(404).json({ message: err.message })
                }

            } catch (err) {
                res.status(404).json({ message: err.message })
            }
        }
    }
]

export const delete_post_delete = async (req, res) => {
    try {
        // Gather and delete post's comments
        await Comment.deleteMany({'post': req.params.id});
        
        try {
            // delete post
            const deletedPost = await Post.findByIdAndDelete(req.params.id);
            res.status(200).json(deletedPost);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const delete_comment_delete = async (req, res) => {
    try {
        // Delete comment
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedComment);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const update_post_put = [
    //Sanitation and Validation
    body('post_title').trim().notEmpty().escape(),
    body('post_text').trim().notEmpty().escape(),

    // Process
    async (req, res) => {

        // Error handling
        const errors = validationResult(req);
        if (!errors.isEmpty()) res.status(400).json(errors.array());
        else {
            // Update post
            const post = new Post(
                {
                    title: req.body.post_title,
                    text: req.body.post_text,
                    _id: req.params.id
                }
            );
            
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {new: true});
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(404).json({ message: err.message});
            }
        }
    }
]

export const publish_post_put = async (req, res) => {
    // Update publish status
    const newPost = new Post(
        {
            published: true,
            _id: req.params.id
        }
    );

    // push update to db
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, newPost, {new: true});
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}