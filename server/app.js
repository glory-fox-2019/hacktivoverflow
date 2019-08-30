if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const userRouter = require('./routes/userRouter')
const questionRouter = require('./routes/questionRouter')
const answerRouter = require('./routes/answerRouter')
const topRouter = require('./routes/topRouter')
const errorHandler = require('./helpers/errorHandler')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

mongoose.connect(`mongodb+srv://ecommerce:Thunder123@clustertype40-z9sli.mongodb.net/hacktivoverflow?retryWrites=true&w=majority`, { useNewUrlParser: true })
.then(success => {
    console.log('mongoose connected')
})
.catch(err => {
    console.log(err.message)
})

app.use('/users', userRouter)
app.use('/questions', questionRouter)
app.use('/answers', answerRouter)
app.use('/top', topRouter)

app.use(errorHandler)

app.listen(PORT, (req, res) => {
    console.log(`connected to port ${PORT}`)
})