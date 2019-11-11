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
              time: Date.now(),
              likes: []
            }
          ]
        });
        newReview.save().then(result => {
          User.findOne({ username: user.username }).then(user => {
            user.reviews.push(result._id);
            user.save().then(user => {
              res
                .status(201)
                .json({ message: 'Added post', review: result.reviews[0] });
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
          likes: []
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
  const { editedReview, tmdbId, index } = req.body;
  Review.findOne({ tmdbId })
    .then(movie => {
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

exports.likeReview = (req, res, next) => {
  const { username, tmdbId, index } = req.body;
  Review.findOne({ tmdbId })
    .then(movie => {
      let { likes } = movie.reviews[index];
      if (movie.reviews[index].likes.includes(username)) {
        likes = likes.filter(like => {
          return like !== username;
        });
        movie.reviews[index].likes = likes;
        movie.save().then(savedReview => {
          res
            .status(200)
            .json({ message: 'Review liked', reviews: savedReview });
        });
      } else {
        likes.push(username);
        movie.reviews[index].likes = likes;
        movie.save().then(savedReview => {
          res
            .status(200)
            .json({ message: 'Review unliked', reviews: savedReview });
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
