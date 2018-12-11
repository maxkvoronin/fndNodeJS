const express = require('express');
const passport = require('passport');

const router = express.Router();

const ctrlPosts = require('../controllers/posts');
const ctrlComment = require('../controllers/comments');
const ctrlLikes = require('../controllers/likes');

const savePicture = require('../middleware/savePicture');

router.use(passport.authenticate('jwt', { session: false }));

router.get   ('/', ctrlPosts.findPosts);
router.post  ('/', savePicture, ctrlPosts.createPost);
router.get   ('/:postId', ctrlPosts.findOnePost);
router.patch ('/:postId', savePicture, ctrlPosts.editPost);
router.delete('/:postId', ctrlPosts.deletePost);

router.get   ('/:postId/comments', ctrlComment.findComments);
router.post  ('/:postId/comments', ctrlComment.createComment);
router.get   ('/:postId/comments/:commentId', ctrlComment.findCommentById);
router.patch ('/:postId/comments/:commentId', ctrlComment.editComment);
router.delete('/:postId/comments/:commentId', ctrlComment.deleteComment);

router.post  ('/:postId/likes', ctrlLikes.setLikeOrDislike);

module.exports = router;
