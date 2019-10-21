const mongoose = require('mongoose');
const User = require('../models/user');
const Review = require('../models/review');

exports.addReview = (req, res, next) => {
  console.log(req.body.user);
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
              image: user.image,
              text: review,
              likes: 0
            }
          ]
        });
        newReview.save().then(result => {
          User.findOne({ username: user.username }).then(user => {
            user.reviews.push(result._id);
            user.save().then(user => {
              res.status(201).json({ message: 'Added post', review: result });
            });
          });
        });
      } else {
        const reviewPost = {
          userId: user._id,
          username: user.username,
          image: user.image,
          text: review,
          time: Date.now(),
          likes: 0
        };
        foundedReview.reviews.push(reviewPost);
        foundedReview.save().then(result => {
          User.findOne({ username: user.username }).then(user => {
            user.reviews.push(result._id);
            user.save().then(user => {
              console.log(result);
              res
                .status(201)
                .json({ message: 'Added post', review: reviewPost });
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

exports.getReviews = (req, res, next) => {
  const tmdbId = Number(req.params.id);
  Review.findOne({ tmdbId })
    .then(movie => {
      if (!movie) {
        res.status(200).json({ reviews: [] });
      } else {
        res.status(200).json({ reviews: movie.reviews });
      }
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.editReview = (req, res, next) => {
  console.log(req.body);
  const { editedReview, tmdbId, index } = req.body;
  Review.findOne({ tmdbId: Number(tmdbId) })
    .then(movie => {
      console.log(movie);
      movie.reviews[index].text = editedReview;
      movie.save().then(savedReview => {
        res.status(200).json({ message: 'Updated successfully' });
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
