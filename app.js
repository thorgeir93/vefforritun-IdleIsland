var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');

var viewCounter = require('./middleware/viewCounter');
var errorHandler = require('./middleware/errorHandler');
var notFoundHandler = require('./middleware/notFoundHandler');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

var cookie = { domain: '',
               httpOnly: false,
               secure: false,
               maxAge : 36000000 };

app.use(session({
  secret: 'session secret!',
  resave: false,
  saveUninitialized: true,
  cookie: cookie,
  name: 'session'
}));

app.use(viewCounter);
app.use('/', routes);
//app.user('/',)
app.use('/users', users);
app.use('/', auth);


// error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}



module.exports = app;
