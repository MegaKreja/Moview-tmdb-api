const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
  tmdbId: {
    type: Number,
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
  watchlistUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  ]
});

module.exports = mongoose.model('watchlist', watchlistSchema);
