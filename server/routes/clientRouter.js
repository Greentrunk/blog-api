import express from 'express';
const router = express.Router();

import {posts_get, post_comments_get, new_comment_post} from '../controllers/postController.js'

// All posts GET
router.get('/', posts_get);

// Post comments GET
router.get('/comments/all', post_comments_get);

// New comment POST
router.post('/comments/new', new_comment_post)

export default router;