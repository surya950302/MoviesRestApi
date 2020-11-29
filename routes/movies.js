const express = require('express');
const router = express.Router();
const { Movie, MovieV2, ValidateMovie } = require('../models/movies');
const schemaVersion = "v2";

//POST: Create a new Movie entry
router.post('/',async (req,res) =>{
	const error = await ValidateMovie(req.body);
	if(error.message) res.status(400).send(error.message);
	movie = new Movie({
		name:req.body.movieName,
		director:{
			name:req.body.directorName,
			age:req.body.directorAge
		},
		genre:req.body.genre
	});

	movie.save().then(movie => {
		res.send(movie);
	}).catch(error => {
		const errorString = "Book was not stored in DB";
		res.status(500).send(setErrorMessage(errorString, error));
	});
});

//GET: get all books
router.get('/',(req,res) =>{
	Movie.find()
	.then((movies) => res.send(movies))
	.catch((error) => {
		const errorString = "Something went wrong";
		res.status(500).send(setErrorMessage(errorString, error));
	})
});

//GET: get Movie by ID
router.get('/:id', async (req,res) =>{
	const movie = await Movie.findById(req.params.id);
	if(!movie) res.status(404).send("Movie not Found");
	res.send(movie);
});

//PUT: Update Movie based on ID
router.put('/:id', async (req,res) =>{
	const movie = await Movie.findByIdAndUpdate(req.params.id,{
		name:req.body.movieName,
		director:{
			name:req.body.directorName,
			age:req.body.directorAge
		},
		genre:req.body.genre
	},
	{ new:true});
	if(!movie) res.status(404).send("Movie not Found");
	res.send(movie);
});

//DELETE: delete Movie based on ID
router.delete('/:id', async (req,res) =>{
	const movie = await Movie.findByIdAndRemove(req.params.id);
	if(!movie) res.status(404).send("Movie not Found");
	res.send(movie);
});


//POST: Create a new Movie entry with Genre as an Array
router.post('/v2',async (req,res) =>{
	console.log(req.body)
	const error = await ValidateMovie(req.body, schemaVersion);
	if(error.message) res.status(400).send(error.message);
	movie = new Movie({
		name:req.body.movieName,
		director:{
			name:req.body.directorName,
			age:req.body.directorAge
		},
		genre:req.body.genre
	});

	movie.save().then(movie => {
		res.send(movie);
	}).catch(error =>{
		res.status(500).send(error);
	});
});

/*
	Accepts Array of JSON objects to bulk insert movies.
 */
router.post('/v2/bulk',async (req,res) =>{
	let responseBody = [];
	let error = "";
	for (let i = 0; i < req.body.length; i++) {
		error = await ValidateMovie(req.body[i], schemaVersion);
		let movie = new Movie({
			name:req.body[i].movieName,
			director:{
				name:req.body[i].directorName,
				age:req.body[i].directorAge
			},
			genre:req.body[i].genre.toString()
		});
		movie.save().then(movie => {
			responseBody.push(movie)
		}).catch(error =>{
			res.status(500).send(error);
		}).then(function () {
			if (i === req.body.length -1) {
				res.send(responseBody)
			}
		});
	}
	if(error.message) {
		res.status(400).send(error.message);
	}
});


// v2 - Update Movie based on ID but accept Genre as an array
router.put('/v2/:id', async (req,res) =>{
	const movie = await MovieV2.findByIdAndUpdate(req.params.id,{
			name:req.body.movieName,
			director:{
				name:req.body.directorName,
				age:req.body.directorAge
			},
			genre: req.body.genre
		},
		{ new:true});
	if(!movie) res.status(404).send("Movie not Found");
	res.send(movie);
});

function setErrorMessage(errorString, error) {
	if (process.env.ENV === "PRODUCTION") {
		return errorString;
	} else {
		return error;
	}
}

module.exports = router;