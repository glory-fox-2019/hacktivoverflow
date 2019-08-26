if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://admin:admin@master-cluster-nwspo.mongodb.net/hacktiv-overflow?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
});

app.use(require('cors')());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const user = require('./routes/user');
app.use('/user', user);

const question = require('./routes/question');
app.use('/question', question);

const comment = require('./routes/comment');
app.use('/comment', comment); 

const answer = require('./routes/answer');
app.use('/answer', answer); 

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

app.listen( PORT , () => {
  console.log('\x1b[33m\x1b[1m', ' * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log(
    '\x1b[33m\x1b[1m', ' *',
    '\x1b[37m\x1b[1m', `Exclusive connected to port >>>>>> ${PORT}!`,
    '\x1b[33m\x1b[1m', ' *','\x1b[34m\x1b[1m');
    // console.log(`Exclusive connected to port >>>>>> 3000!`)
  console.log('\x1b[33m\x1b[1m', ' * * * * * * * * * * * * * * * * * * * * * * * *');
});