const express = require('express');
const passport = require('passport');

const router = express.Router();
const ctrlProfile = require('../controllers/profile');

//router.use(passport.authenticate('jwt', { session: false }));

router.get ('/',        ctrlProfile.render);
router.post('/',        ctrlProfile.saveUserProfile);
router.get ('/:userId', ctrlProfile.getUserProfile);

module.exports = router;
