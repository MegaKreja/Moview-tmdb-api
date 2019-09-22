const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  tmdbId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  ratings: [
    {
      userId: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('Rating', RatingSchema);
