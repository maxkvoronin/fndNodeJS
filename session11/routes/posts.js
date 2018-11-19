const express = require('express');
const router = express.Router();

const ctrlPosts = require('../controllers/posts');
const ctrlComment = require('../controllers/posts.comments');

router.get('/', ctrlPosts.findPosts);
router.get('/:postId', ctrlPosts.findPostById);

router.post('/', ctrlPosts.createPost);
router.patch('/:postId', ctrlPosts.editPost);
router.delete('/:postId', ctrlPosts.deletePost);

router.get('/:postId/comments', ctrlComment.findComments);
router.post('/:postId/comments', ctrlComment.createComment);

router.get('/comments/:commentId', ctrlComment.findCommentById);
router.patch('/comments/:commentId', ctrlComment.editComment);
router.delete('/comments/:commentId', ctrlComment.deleteComment);

module.exports = router;
