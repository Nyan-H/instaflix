const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Models = require('./models.js');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./passport');

const Movies = Models.Movie;
const Users = Models.User;
const app  = express();


mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})
app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());
var auth = require('./auth')(app);

app.get('/', function(req, res) {
  res.send('Welcome to Instaflix, Instant Flix on demand!')
});

//Look at all the movies
app.get('/movies', (req, res) => {
  Movies.find()
  .then(function(movie){
    res.status(201).json(movie);
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//Search Movie by their Tile 
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({Title: req.params.Title})
  .then(function(movie){
    if(movie){
      res.json(movie);
    }else{
      res.status(400).send(req.params.Title + " does not exist");
    }
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});




//Get a user by username
app.get('/users/:Username', function(req, res) {
  Users.findOne({ Username : req.params.Username })
  .then(function(users) {
    res.json(users)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//Add a ner user
app.post('/users', function(req, res) {
  Users.findOne({ Username : req.body.Username })
  .then(function(user) {
    if (user) {
      return res.status(400).send(req.body.Username + " already exists");
    } else {
      Users
      .create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then(function(user) {res.status(201).json(user) })
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      })
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

// Get all users
app.get('/users', function(req, res) {

  Users.find()
  .then(function(users) {
    res.status(201).json(users)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// Update a user's information, by username
app.put('/users/:Username', function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, { $set :
  {
    Username : req.body.Username,
    Password : req.body.Password,
    Email : req.body.Email,
    Birthday : req.body.Birthday
  }},
  { new : true }, // This line makes sure that the updated document is returned
  function(err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " +err);
    } else {
      res.json(updatedUser)
    }
  })
});

// Delete a user by username
app.delete('/users/:Username', function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then(function(user) {
    if (!user) {
      res.status(400).send(req.params.Username + " was not found");
    } else {
      res.status(200).send(req.params.Username + " was deleted.");
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

















app.listen(8080, () =>
console.log('App is listening on port 8080')
);

app.use(function (err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


