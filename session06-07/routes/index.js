const express = require('express');
const router = express.Router();

const ctrlIndex = require('../controllers/index');

router.get('/', ctrlIndex.render);

module.exports = router;
