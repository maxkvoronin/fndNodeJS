const express = require('express');
const router = express.Router();

const ctrlHome = require('../controllers/index');
const ctrlAbout = require('../controllers/about');
const ctrlPost = require('../controllers/post');
const ctrlContact = require('../controllers/contact');

router.get('/', ctrlHome.getIndexPage);

router.get('/about', ctrlAbout.getAboutPage);

router.get('/post', ctrlPost.getPostPage);
router.get('/api/v1/post', ctrlPost.getPostData);

router.get('/contact', ctrlContact.getContactPage);
router.post('/api/v1/contact/form-data', ctrlContact.checkContactForm);

module.exports = router;
