const express = require('express');
const router = express.Router();

const listController = require('../controllers/ListController');

router.post('/favorite', listController.favorited);

module.exports = router;
