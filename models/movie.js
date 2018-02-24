var mongoose = require('mongoose');

//Genre Schema
var movieSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	relase_date: {
		type: String
	},
	genre: {
		type: String
	},
	description: {
		type: String
	},
	rating: {
		type: Number, min: 1, max: 10,
		required: true
	},
	image_url: {
		type: String
	}
});

var Movie = module.exports = mongoose.model('Movie',movieSchema);
// make the movie module to be accesible from anywhere else

//Get movies
module.exports.getMovies = function(callback,limit){
	Movie.find(callback).limit(limit);
};
module.exports.getMovieById = function(id,callback){
	Movie.findById(id, callback); 
};

module.exports.getMovieByTitle = function(title,callback){
	Movie.find( { title: { $regex: title, $options: "i" }  }, callback); 
};

module.exports.addMovie = function(movie, callback){
	Movie.create(movie, callback);
};

module.exports.updateMovie = function(id, movie, options, callback){
	var query = {_id: id};
	var update = {
		title: movie.title,
		relase_date: movie.relase_date,
		genre: movie.genre,
		description: movie.description,
		rating: movie.rating,
		image_url: movie.image_url
	}
	Movie.findOneAndUpdate(query, update, options, callback);
};

module.exports.removeMovie = function(id, callback){
	var query = {_id: id};
	Movie.remove(query, callback);
};