const express = require('express');
const router = express.Router();
const {Movie, ValidateMovie} = require('../models/movies');


//POST: Create anew Movie entry
router.post('/',async (req,res) =>{
	const error = await ValidateMovie(req.body);
	if(error.message) res.status(400).send(error.message);
	movie = new Movie({
		title:req.body.title,
		tagline:req.body.tagline,
		popularity:req.body.popularity,
		runtime:req.body.runtime,
		rating:req.body.rating,
		overview:req.body.overview,
		adult:req.body.adult,
		language:req.body.language,
		poster_path:req.body.poster_path,
		genre:req.body.genre,
		credits:{
			director:req.body.director,
			actor:req.body.actor
		},
		release_year:req.body.release_year
	});

	movie.save().then(movie => {
		res.send(movie);
	}).catch(error =>{
		res.status(500).send("Movie was not stored in DB");
	});
});
//PUSH: insert bulk data at once
router.post('/bulk',async (req,res) =>{
	let responseBody = [];
	let error = "";
	for (let i = 0; i < req.body.length; i++) {
		error = await ValidateMovie(req.body[i]);
		let movie = new Movie({
			title:req.body[i].title,
			tagline:req.body[i].tagline,
			popularity:req.body[i].popularity,
			runtime:req.body[i].runtime,
			rating:req.body[i].rating,
			overview:req.body[i].overview,
			adult:req.body[i].adult,
			language:req.body[i].language,
			poster_path:req.body[i].poster_path,
			genre:req.body[i].genre,
			credits:{
				director:req.body[i].director,
				actor:req.body[i].actor
			},
			release_year:req.body[i].release_year
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
		title:req.body.title,
		tagline:req.body.tagline,
		popularity:req.body.popularity,
		runtime:req.body.runtime,
		rating:req.body.rating,
		overview:req.body.overview,
		adult:req.body.adult,
		language:req.body.language,
		posterpath:req.body.posterpath,
		genre:req.body.genre,
		credits:{
			director:req.body.director,
			actor:req.body.actor
		},
		release_year:req.body.release_year
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