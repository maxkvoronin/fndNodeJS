const express = require('express');
const router = express.Router();

const ctrlProfile = require('../controllers/profile');

router.get('/', ctrlProfile.render);

module.exports = router;
