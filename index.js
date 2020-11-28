const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const moviesRoute = require('./routes/movies');
const winston = require('winston');

const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//create a logger
const logger = winston.createLogger({
	level:'info',
	transports:[
		new winston.transports.Console({
			format:winston.format.combine(
				winston.format.colorize({all:true})
			)
		}),
		new winston.transports.File({filename: 'error.log', level:'error'})
	],
	exceptionHandlers:[
		new winston.transports.File({filename:'exceptions.log'})
	]
});

//routes
app.use('/api/movies',moviesRoute);

//connect to mongo db
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true}).then(() =>{
	logger.info("Connected to MongoDB Atlas")
}).catch(error =>{
	logger.error(error.message);
});

// start server
app.listen(PORT, () => {
	logger.info(`Server is running on Port ${PORT}`);
})
