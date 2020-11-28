const mongoose = require('mongoose');
const Person = require('./person')

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

module.exports = new mongoose.model('Movie',MovieSchema);