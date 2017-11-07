const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  score: Number
});

module.exports = mongoose.model('User', UserSchema);
