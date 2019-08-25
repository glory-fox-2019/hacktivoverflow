if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
  require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT;
const cors = require('cors');
const routes = require('./routes');

mongoose.connect('mongodb://localhost:27017/task_hacktivoverflow',{ useNewUrlParser: true })
  .then(() => console.log('Connected to Database'))
  .catch(err => console.log('Error Connecting to database | Error:'+err));


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use('/user',routes.user);
app.use('/question',routes.question);


app.use('/', (req,res,next) => next({httpStatus: 404, message:'Url not found'}))

app.use(function(err,req,res,next){
  let messages;
  let httpStatus;
  if(err.name === 'ValidationError'){
    httpStatus = 406
    messages = Object.keys(err.errors).map((el) => err.errors[el].message);
  }

  console.log(messages || err.message || err || 'Internal Server Error');
  console.log(httpStatus || err.httpStatus || 500)
  
  res.status(httpStatus || err.httpStatus || 500)
    .json({error: messages || err.message || err || 'Internal Server Error'});
})

app.listen(port, () => console.log('Server is running in port:' + port))