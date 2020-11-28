const mongoose =  require("mongoose");

 //PERSON SCHEMA
 const PersonSchema = new mongoose.Schema({
 	name:{
 		type:String,
 		required:true,
		minlength:3,
		maxlength:50
 	},
 	age:{
 		type:Number,
 		required:true,
 	}
 });

 module.exports = new mongoose.model('Person',PersonSchema);