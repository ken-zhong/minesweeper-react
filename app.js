const express = require('express');
const settings = require('./settings.json');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(settings.mongoUrl);

app.get('/', (req, res) => {
  res.send({data: 'it\'s alive!'});
});

let port = process.env.PORT || 3000;
app.listen(port, process.env.IP, () => {
  console.log('listening on ' + port);
});
