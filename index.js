const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const moviesRoute = require('./routes/movies');


const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use('/api/movies',moviesRoute);

//connect to mongo db
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true}).then(() =>{
	console.log("Connected to MongoDB Atlas")
}).catch(error =>{
	console.log("Something wrong happened",error);
});

// start server
app.listen(PORT, () => {
	console.log(`Server is running on Port ${PORT}`);
})