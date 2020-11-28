const express = require('express');
const router = express.Router();
const Movie = require('../models/movies');


//POST: Create anew Movie entry
router.post('/',(req,res) =>{

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

module.exports = router;