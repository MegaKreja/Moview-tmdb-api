const express = require('express');
const router = express.Router();

const listController = require('../controllers/ListController');

router.post('/favorite', listController.favorited);
router.post('/watchlist', listController.watchlist);

module.exports = router;
