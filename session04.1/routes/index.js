const express = require('express');
const router = express.Router();

const ctrlGetList = require('../controllers/getList');
const ctrlGetListItemById = require('../controllers/getListItemById');

router.get('/getList', ctrlGetList);
router.get('/getListItemById/:id', ctrlGetListItemById);

/***/
router.get('/hardOperation', (req, res) => {
  setTimeout(() => res.status(200).end(), 3000);
});

module.exports = router;
