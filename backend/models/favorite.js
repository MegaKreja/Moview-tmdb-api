const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
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
  favoritedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  ]
});

module.exports = mongoose.model('favorite', favoriteSchema);
