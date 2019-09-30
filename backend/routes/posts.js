const express = require('express');
const router = express.Router();

const postController = require('../controllers/PostController');

router.post('/add', postController.addReview);

module.exports = router;
