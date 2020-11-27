const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();


const PORT = process.env.PORT || 3000;

//connect to mongo db
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true}).then(() =>{
	console.log("Connected to MongoDB Atlas")
});

// start server
app.listen(PORT, () => {
	console.log(`Server is running on Port ${PORT}`);
})