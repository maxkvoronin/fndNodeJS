const express = require('express');
const router = express.Router();

const ctrlLogin = require('../controllers/login');

router.get('/', ctrlLogin.renderLogin);
router.get('/signup', ctrlLogin.renderSignUp);

module.exports = router;
