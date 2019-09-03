const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  tmdbId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  releaseDate: {
    type: String,
    required: true
  },
  posterPath: {
    type: String,
    required: true
  },
  favoriteMovies: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  watchlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

module.exports = mongoose.model('movie', movieSchema);
