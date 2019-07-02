const express = require('express'),
    morgan = require('morgan');

const app  = express();
app.use(express.static('public'));
app.use(morgan('common'));


//top ten movies
let topMovies = [ {
    title: 'Inception'
},
{
    title: 'Jusrasic Park'
},
{
    title: 'Shutter Island'
},
{
    title: 'Pulp Fiction'
},
{
    title: 'Elf'
},
{
    title: 'A Quiet Place'
},
{
    title: 'Black Panther'
},
{
    title: 'Us'
},
{
    title: 'Logan'
},
{
    title: 'Get Out'
},

]app.use(function (err, req, res, next){
]

// Get Requests

app.get('/movies', function(req, res) {
    res.json(topMovies)
});

app.get('/', function(req, res) {
    res.send('Welcome to Instaflix, Instant Flix on demand!')
});

app.listen(8080, () =>
    console.log('App is listening on port 8080')
);

app.use(function (err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Something broke!');
});