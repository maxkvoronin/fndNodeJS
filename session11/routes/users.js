const express = require('express');
const router = express.Router();

const ctrlUsers = require('../controllers/users');

router.post('/signup', ctrlUsers.signUp);
router.post('/signin', ctrlUsers.signIn);

module.exports = router;
