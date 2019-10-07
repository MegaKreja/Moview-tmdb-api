const express = require('express');
const router = express.Router();

const postController = require('../controllers/PostController');

router.post('/add', postController.addReview);
router.get('/:id', postController.getReviews);

module.exports = router;
