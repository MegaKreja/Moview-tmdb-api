const User = require('../models/user');
const Favorite = require('../models/favorite');
const Watchlist = require('../models/watchlist');

exports.favorited = (req, res, next) => {
  const { movie, user, favorite } = req.body;
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
            user.favoriteMovies = [favoriteMovie.tmdbId];
            user.save().then(user => {
              res.status(201).json({ message: 'Changed to favorite' });
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
            const favoriteMovieId = favoriteMovie.tmdbId;
            if (favorite) {
              favoriteMovies.push(favoriteMovieId);
            } else {
              favoriteMovies = favoriteMovies.filter(
                movieIndex => movieIndex !== favoriteMovieId
              );
            }
            user.favoriteMovies = favoriteMovies;
            user.save().then(user => {
              const message = favorite
                ? 'Changed to favorite'
                : 'Removed from favorite';
              res.status(201).json({ message });
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

exports.watchlist = (req, res, next) => {
  const { movie, user, watchlist } = req.body;
  Watchlist.findOne({ tmdbId: movie.id }).then(foundedMovie => {
    if (!foundedMovie) {
      const newWatchlist = new Watchlist({
        tmdbId: movie.id,
        title: movie.title,
        releaseDate: movie.release_date,
        posterPath: movie.poster_path,
        watchlistUsers: [user._id]
      });
      newWatchlist
        .save()
        .then(watchlistMovie => {
          User.findById({ _id: user._id }).then(user => {
            user.watchlistMovies = [watchlistMovie.tmdbId];
            user.save().then(user => {
              res.status(201).json({ message: 'Added to watchlist' });
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
      let users = foundedMovie.watchlistUsers.slice();
      const userId = user._id;
      if (watchlist) {
        users.push(userId);
      } else {
        users = users.filter(userIndex => userIndex.toString() !== userId);
      }
      foundedMovie.watchlistUsers = users;
      foundedMovie
        .save()
        .then(watchlistMovie => {
          User.findById({ _id: user._id }).then(user => {
            let watchlistMovies = user.watchlistMovies.slice();
            const watchlistMovieId = watchlistMovie.tmdbId;
            if (favorite) {
              watchlistMovies.push(watchlistMovieId);
            } else {
              watchlistMovies = watchlistMovies.filter(
                movieIndex => movieIndex !== watchlistMovieId
              );
            }
            user.watchlistMovies = watchlistMovies;
            user.save().then(user => {
              const message = favorite
                ? 'Added to watchlist'
                : 'Removed from watchlist';
              res.status(201).json({ message });
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
