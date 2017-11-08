const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Score = require('./models/score');
var cors = require('cors');
const app = express();

mongoose.connect("mongodb://krabbis:thebard@ds153015.mlab.com:53015/minesweeper");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// The 'waker' route
app.get('/', (req, res) => {
  res.json('It\'s alive!');
});

// get high scores here
app.get('/api/scores/:difficulty', (req, res) => {
  let query = Score.find({difficulty: req.params.difficulty});
  query.select('username difficulty score')
    .limit(10)
    .sort({score: 1})
    .exec((err, scores) => {
      if (err) {
        res.status(422);
        res.send(err);
      } else {
        res.json(scores);
      }
    });
});

// Create new score here
app.post('/api/scores', (req, res) => {
  // console.log(req.body);
  const newScore = new Score(req.body);
  newScore.save((err, newScore) => {
    if (err) {
      res.status(422);
      res.send(err);
    } else {
      res.status(201);
      res.redirect(`/api/scores/${req.body.difficulty}`);
    }
  });
});

let port = process.env.PORT || 3000;
app.listen(port, process.env.IP, () => {
  console.log('listening on ' + port);
});
