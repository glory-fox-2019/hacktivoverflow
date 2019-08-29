if(!process.env.NODE_ENV || process.env.DEV == 'development'){
    const env = require('dotenv').config()
}
const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const app = express()
const routes = require('./routes')
const port = process.env.PORT || 3000

 
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(`mongodb://${process.env.NAME_MONGO}:${process.env.PASSWORD_MONGO}@cluster0-shard-00-00-qjyss.mongodb.net:27017,cluster0-shard-00-01-qjyss.mongodb.net:27017,cluster0-shard-00-02-qjyss.mongodb.net:27017/${process.env.DB_NAME_MONGO}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority` , {useNewUrlParser: true},(err,client)=>{
    if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
    }else{
        console.log('success connect to mongo');
        }
})
 
app.use(cors())
app.get('/',(req,res)=>{
    res.send('REST API')
})
 
app.use('/api',routes)
 
app.use(function (err, req, res, next) {
    console.log(err)
    res.status(500).send({message : 'Internal Server Error' })
})
 
app.listen(port,()=>{
    console.log('listening to port ',port);
})
