const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  tmdbId: {
    type: Number,
    required: true
  },
  reviews: [
    {
      userId: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true
      },
      image: {
        type: String
      },
      text: {
        type: String,
        required: true
      },
      likes: [],
      time: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model('Review', ReviewSchema);
