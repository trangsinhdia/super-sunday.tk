var io = require('socket.io')
var app = require('../app')
var http = require('http').Server(app);
var datetime = require('../function/DateTime')
var chatBackup = require('../database/ChatBackup')

http.listen(3002, function(){
    console.log('listening on *:3002');
})
var io = require('socket.io')(http);

module.exports = {
    start: () => {
        io.on('connection', function(socket){
            console.log(socket.id + ': connected');
            socket.emit('id', socket.id);
            
            chatBackup.MessageFromDB((err, result) => {
              if(result){
                socket.emit('chathistory', result)
              }
              else{
                socket.emit('chathistory', err)
              }
            })
          
            socket.on('disconnect', function(){
              console.log(socket.id + ': disconnected')
            })
          
            socket.on('newMessage', (data) => {
              io.sockets.emit('newMessage', {message: data.message, username: data.user});
              chatBackup.MessageToDB({
                username: data.user,
                message: data.message,
                time: datetime.ConvertToDay(data.time) + ' ' + new Date(data.time).getHours() + ':' + new Date(data.time).getMinutes() +  ':' + new Date(data.time).getSeconds()
              })
            })
        });
    }
}