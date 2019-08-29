if(process.env.NODE_ENV==='development'){
    require('dotenv').config()
};

const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');
const cronJob = require('./cron')

const app = express();

// Check mongoose connection
mongoose.connect(`mongodb+srv://mongodb:${process.env.MONGODB_PASSWORD}@mongodb-9zz64.gcp.mongodb.net/overflow?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connect to mongodb')
});

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger('dev'));

cronJob()

// Routes
app.use('/api', routes);

// Error Handler
app.use(errorHandler);

module.exports = app