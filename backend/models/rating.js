const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  tmdbId: {
    type: Number
  },
  title: {
    type: String,
    required: true
  },
  ratings: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      score: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('Rating', RatingSchema);
