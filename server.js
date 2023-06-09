var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cokkieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection = require('./lib/db');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users')
var customersRouter = require('./routes/customers');
var app = express();
// view engine setup 

app.set('views',path.join(__dirname,'views'));
app.set('view enginer','ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(cokkieParser());
app.use(express.static(path.join(__dirname,'public')))

app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))

app.use(flash());
app.use(expressValidator());
app.use('/', indexRouter);
app.use('/users',usersRouter);
app.use('/customers',customersRouter);


//catch 404 and forward  to error handler 
app.use(function(req,res,next){
    next(createError(404));
});

//error handler
app.use(function(err,res,next){
    res.locals,message = err.message;
    res.locals.error = req.app.get('env') === 'devlopment' ? err : {};
    res.status(err.status || 500 );
    res.render('error');
});
//port must be set to 3000 because incoming http requested from port 80 to port 8080
app.listen(3000, function(){
    console.log('Node app is running on port 3000');
});
module.exports = app;
