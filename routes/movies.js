const express = require('express');
const router = express.Router();
const {Movie, ValidateMovie} = require('../models/movies');


//POST: Create anew Movie entry
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
	}).catch(error =>{
		res.status(500).send("Book was not stored in DB");
	});
});

//GET: get all books
router.get('/',(req,res) =>{
	Movie.find()
	.then((movies) => res.send(movies))
	.catch((error) => {
		res.status(500).send("Something went wrong")
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
module.exports = router;