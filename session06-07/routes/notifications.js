const express = require('express');
const router = express.Router();

const ctrlNotifications = require('../controllers/notifications');

router.get('/', ctrlNotifications.render);

module.exports = router;
