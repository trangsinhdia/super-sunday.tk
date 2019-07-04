var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var init = require('./database/Init');
var homeRouter = require('./routes/home');
var usersRouter = require('./routes/users');
var getTable = require('./routes/GetTable')
var register = require('./routes/Register')
var login = require('./routes/Login.js')
var chat = require('./function/Chat')
var getReplay = require('./routes/GetReplay')
var getSchedule = require('./routes/GetSchedule')
var policy = require('./routes/policy')
var fotgetPassword = require('./routes/ForgetPassword')
var logOut = require('./routes/Logout')

var app = express();

init.run()
chat.start()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/home', homeRouter);
app.use('/users', usersRouter);
app.use('/gettable', getTable)
app.use('/register', register)
app.use('/login', login)
app.use('/logout', logOut)
app.use('/forgetpassword', fotgetPassword)
app.use('/getreplay', getReplay)
app.use('/getschedule', getSchedule)
app.use('/policy', policy)

module.exports = app;
