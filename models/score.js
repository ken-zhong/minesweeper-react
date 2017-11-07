const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Score', ScoreSchema);
