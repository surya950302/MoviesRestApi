const mongoose = require('mongoose');
const Person = require('./person');
const yup = require('yup');

//Movie Schema
const MovieSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true,
		minlength:3,
		maxlength:50
	},
	director: Person.schema,
	genre:{
		type:String,
		required:true,
		minlength:3,
		maxlength:20
	}
});

// Movie Schema v2 which accepts genre as an Array
const MovieSchemaV2 = new mongoose.Schema({
	name:{
		type:String,
		required:true,
		minlength:3,
		maxlength:50
	},
	director: Person.schema,
	genre:{
		type:Array,
		required:true,
		minlength:1,
		maxlength:20
	}
});

const validateMovie = (movie, version) => {
	let schema = yup.object().shape({
		movieName:yup.string().required().min(3).max(50),
		directorName:yup.string().required().min(3).max(50),
		directorAge:yup.number().required(),
		genre:yup.string().required().min(3).max(20)
	});

	if (version && version === "v2") {
		schema = yup.object().shape({
			movieName:yup.string().required().min(3).max(50),
			directorName:yup.string().required().min(3).max(50),
			directorAge:yup.number().required(),
			genre:yup.array().min(1, 'The error message if length === 0 | 1')
		});
	}

	return schema
	.validate(movie)
	.then(movie => movie)
	.catch(error =>{
		return {
			message:error.message
		}
	});

}

exports.Movie = new mongoose.model('Movie', MovieSchema);
exports.MovieV2 = new mongoose.model('Movie2', MovieSchemaV2);
exports.ValidateMovie = validateMovie;