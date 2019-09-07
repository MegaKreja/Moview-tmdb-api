const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  favoriteMovies: [
    {
      type: mongoose.Schema.Types.Number,
      ref: 'Favorite',
      required: true
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);
