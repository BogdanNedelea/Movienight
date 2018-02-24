var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'jade');

Genre = require('./models/genre');
Movie = require('./models/movie');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/moviesdb');
var db = mongoose.connection;

app.get('/', function(req, res){
  res.render('index');
});



app.get('/api/search', function(req,res){  
  var title = req.query.title;
  Movie.getMovieByTitle(title, function(err,movies){
    if(err){
      throw err;
    }
    res.render('movie-cards', {movies});
  });
});

app.get('/api/movies', function(req,res){    
  Movie.getMovies(function(err,movies){
    if(err){
      throw err;
    }
    res.render('movie-cards', {movies});
  });
});


app.get('/api/login', function(req,res){  
  res.render('login');
});



//// FORM
app.get('/api/movie-form', function(req,res){   
  res.render('form');
});

app.post('/api/movie-form', function(req,res){       
  var movie = req.body;
  Movie.addMovie(movie,function(err,movie){
    if(err){
      throw err;
    }
    return res.redirect('/api/movies');
  });
});



//// The view with info about only one movie
app.get('/movies/:_id', function(req,res){          
  Movie.getMovieById(req.params._id,function(err,movie){
    if(err){
      throw err;
    }
    res.render('movie-details', {movie});
  });
});

app.get('/api/edit-form/:_id', function(req,res){       
  Movie.getMovieById(req.params._id,function(err,movie){
    if(err){
      throw err;
    }
    res.render('edit-form', {movie});
  });
});

app.post('/api/edit-form', function(req,res){
  var movie = req.body;
  Movie.updateMovie(movie.id, movie, {}, function(err,movie){
    if(err){
      throw err;
    }
	return res.redirect('/api/movies');
  });
});

app.delete('/api/movies/:_id', function(req,res){
  var id = req.params._id;
  Movie.removeMovie( id, function(err,movie){
    if(err){
      throw err;
    }
	res.send(200);
  });
});


app.listen(3000);
console.log('Running on port 3000 ! ');