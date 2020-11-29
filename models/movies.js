const mongoose = require('mongoose');
const Person = require('./person');
const yup = require('yup');

//Movie Schema
const MovieSchema = new mongoose.Schema({
	title:{
		type:String,
		required:true,
		minlength:3,
		maxlength:50
	},
	tagline:{
		type:String,
		required:true,
		minlength:3,
		maxlength:50
	},
	popularity:{
		type:Number,
		required:true,
	},
	runtime:{
		type:Number,
		required:true,
	},
	rating:{
		type:Number,
		required:true,
	},
	overview:{
		type:String,
		required:true,
		minlength:10,
	},
	adult:{
		type:Boolean,
		required:true
	},
	language:{
		type:String,
		required:true
	},
	poster_path:{
		type:String,
		required:true
	},
	genre:{
		type:Array,
		required:true,
		minlength:1,
		maxlength:20
	},
	credits:Person.schema,
	release_year:{
		type:String,
		required:true,
		minlength:4
	}
});

const validateMovie = movie =>{
	const schema = yup.object().shape({
		title:yup.string().required().min(3).max(50),
		tagline:yup.string().required().min(3).max(50),
		popularity:yup.number().required(),
		runtime:yup.number().required(),
		rating:yup.number().required(),
		overview:yup.string().required().min(10),
		adult:yup.boolean().required(),
		language:yup.string().required(),
		poster_path:yup.string().required(),
		genre:yup.array().required().min(1),
		director:yup.string().required().min(3).max(30),
		actor:yup.array().required().min(1),
		release_year:yup.string().required().min(4)

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