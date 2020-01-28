const express = require('express');
morgan = require('morgan');
const mongoose = require('mongoose');
const Models = require('./models.j');

const Movies = Models.Movie;
const Users = Models.User;

const app  = express();


mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});


app.use(morgan('common'));

app.use(express.static('public'));

app.get('/movies', function(req, res) {
  res.json(topMovies)
});

app.get('/', function(req, res) {
  res.send('Welcome to Instaflix, Instant Flix on demand!')
});

app.get('/movies/:name', (req, res) => {
  res.json(Students.find( (student) =>
    { return student.name === req.params.name   }));
});
 



app.listen(8080, () =>
console.log('App is listening on port 8080')
);

app.use(function (err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


