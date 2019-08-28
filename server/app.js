if (!process.env.NODE_ENV || process.env.NODE_ENV == 'development'){
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const route = require('./routers/index')


const app = express();
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useCreateIndex: true})
    .then(function() {
        console.log('Connected to DB!')
    })
    .catch(function() {
        console.log('Fail to connect DB!')
    })

app.use('', route);

app.use((err,req,res,next) => {
    let statusCode = err.statusCode || 500
    let message = err.message
    if (err.name === "ValidationError"){
        let key = Object.keys(err.errors)
        statusCode = 400;
        message = err.errors[key[0]].message; 
    }
    if (err.name === 'MongoError'){
        statusCode = 409;
        message = 'Email already used!'
    }
    res.status(statusCode).json({statusCode, message})
})


app.listen(process.env.PORT, function(){
    console.log('Listen to port '+ process.env.PORT)
})

module.exports = app
