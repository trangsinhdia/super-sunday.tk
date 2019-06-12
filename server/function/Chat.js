var io = require('socket.io')
var app = require('../app')
var http = require('http').Server(app);
http.listen(3002, function(){
    console.log('listening on *:3002');
})
var io = require('socket.io')(http);

module.exports = {
    start: () => {
        io.on('connection', function(socket){
            console.log(socket.id + ': connected');
            socket.emit('id', socket.id);
          
            socket.on('disconnect', function(){
              console.log(socket.id + ': disconnected')
            })
          
            socket.on('newMessage', (data, user) => {
              io.sockets.emit('newMessage', {message: data, username: user});
              console.log(data);
            })
        });
    }
}