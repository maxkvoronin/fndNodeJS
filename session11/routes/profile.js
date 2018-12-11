const express = require('express');
const passport = require('passport');

const router = express.Router();
const ctrlProfile = require('../controllers/profile');

router.get ('/',        ctrlProfile.render);
router.post('/',        passport.authenticate('jwt', { session: false }), ctrlProfile.saveUserProfile);
router.get ('/:userId', passport.authenticate('jwt', { session: false }), ctrlProfile.getUserProfile);

module.exports = router;
