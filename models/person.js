const mongoose =  require("mongoose");

 //PERSON SCHEMA
 const PersonSchema = new mongoose.Schema({
 	director:{
 		type:String,
 		required:true,
		minlength:3,
		maxlength:50
 	},
 	actor:{
 		type:Array,
 		required:true,
 		minlength:1
 	}
 });

 module.exports = new mongoose.model('Person',PersonSchema);