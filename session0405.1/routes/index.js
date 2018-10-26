const express = require('express');
const router = express.Router();

const ctrlGetList = require('../controllers/getList');
const ctrlGetListItemById = require('../controllers/getListItemById');
const ctrlGetHardData = require('../controllers/getHardData');

router.get('/getList', ctrlGetList);
router.get('/getListItemById/:id', ctrlGetListItemById);

router.get('/getHardData', ctrlGetHardData);

module.exports = router;
