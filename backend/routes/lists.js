const express = require('express');
const router = express.Router();

const listController = require('../controllers/ListController');

router.post('/favorite', listController.postFavorite);
router.post('/watchlist', listController.postWatchlist);
router.get('/:username/favorite', listController.favorite);
router.get('/:username/watchlist', listController.watchlist);

module.exports = router;
