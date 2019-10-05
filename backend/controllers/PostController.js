const mongoose = require('mongoose');
const User = require('../models/user');
const Review = require('../models/review');

exports.addReview = (req, res, next) => {
  // console.log(req.body);
  const { user, movie, review } = req.body;
  Review.findOne({ tmdbId: movie.id })
    .then(foundedReview => {
      if (!foundedReview) {
        const newReview = new Review({
          tmdbId: movie.id,
          reviews: [
            {
              userId: user._id,
              username: user.username,
              text: review,
              likes: 0
            }
          ]
        });
        newReview.save().then(result => {
          User.findOne({ username: user.username }).then(user => {
            user.reviews.push(result._id);
            user.save().then(user => {
              res.status(201).json({ message: 'Added post' });
            });
          });
        });
      } else {
        foundedReview.reviews.push({
          userId: user._id,
          username: user.username,
          text: review,
          likes: 0
        });
        foundedReview.save().then(result => {
          User.findOne({ username: user.username }).then(user => {
            user.reviews.push(result._id);
            user.save().then(user => {
              res.status(201).json({ message: 'Added post' });
            });
          });
        });
      }
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
