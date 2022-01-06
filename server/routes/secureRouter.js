import express from 'express';
const router = express.Router();

import {new_post_post, delete_post_delete, delete_comment_delete, update_post_put, publish_post_put} from '../controllers/postController.js';

// New post POST
router.post('/', new_post_post);

// Delete post DELETE
router.delete('/:id', delete_post_delete);

// Delete comment DELETE
router.delete('/:id/comment', delete_comment_delete);

// Update post PUT
router.put('/:id/update', update_post_put);

// Publish post PUT
router.put('/:id/publish', publish_post_put);

export default router;