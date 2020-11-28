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

const validateMovie = movie =>{
	const schema = yup.object().shape({
		movieName:yup.string().required().min(3).max(50),
		directorName:yup.string().required().min(3).max(50),
		directorAge:yup.number().required(),
		genre:yup.string().required().min(3).max(20)
	});

	return schema
	.validate(movie)
	.then(movie => movie)
	.catch(error =>{
		return {
			message:error.message
		}
	});

}
exports.Movie = new mongoose.model('Movie',MovieSchema);
exports.ValidateMovie = validateMovie;