const http = require('http')
const app = require('../app')

const srv = http.createServer(app)
const io = require('socket.io')(srv)

const port = process.env.PORT

const arrOfTags = require('../cron')

io.on('connection', function(socket){
    console.log('User connected');

    io.emit('tag:popular', arrOfTags);

    socket.on('disconnect', function(){
        console.log('user disconnected');
        });
})

srv.listen(port, () => console.log('Listen to http server on port: ', port))