const User = require('../models/user');
const Favorite = require('../models/favorite');

exports.favorited = (req, res, next) => {
  const { movie, user, favorite } = req.body;
  console.log(req.body);
  Favorite.findOne({ tmdbId: movie.id }).then(foundedMovie => {
    console.log(foundedMovie);
    if (!foundedMovie) {
      const newFavorite = new Favorite({
        tmdbId: movie.id,
        title: movie.title,
        releaseDate: movie.release_date,
        posterPath: movie.poster_path,
        favoritedUsers: [user._id]
      });
      newFavorite
        .save()
        .then(favoriteMovie => {
          User.findById({ _id: user._id }).then(user => {
            user.favoriteMovies = [favoriteMovie._id];
            user.save().then(user => {
              res.status(201).json({ message: 'Success' });
            });
          });
        })
        .catch(err => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    } else {
      let users = foundedMovie.favoritedUsers.slice();
      const userId = user._id;
      if (favorite) {
        users.push(userId);
      } else {
        users = users.filter(userIndex => userIndex.toString() !== userId);
        console.log(users);
      }
      foundedMovie.favoritedUsers = users;
      foundedMovie
        .save()
        .then(favoriteMovie => {
          User.findById({ _id: user._id }).then(user => {
            let favoriteMovies = user.favoriteMovies.slice();
            const favoriteMovieId = favoriteMovie._id;
            if (favorite) {
              favoriteMovies.push(favoriteMovieId);
            } else {
              favoriteMovies = favoriteMovies.filter(
                movieIndex => movieIndex.toString() !== favoriteMovieId
              );
            }
            user.favoriteMovies = favoriteMovies;
            user.save().then(user => {
              res.status(201).json({ message: 'Favorite movie changed' });
            });
          });
        })
        .catch(err => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    }
  });
};
