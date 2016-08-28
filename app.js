var express = require('express');
var path    = require('path');
var favicon = require('serve-favicon');
var logger  = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

var routes = require('./routes/index');
var status = require('./routes/status');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);
app.use('/status', status);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

pp.use(function (req, res, next) {
  res.header("Content-Type",'application/json');
  next();
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next){
      res.status(err.status || 500);
      res.send({
          message: err.message,
          error: err
      });
     return;
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next){
    app.set('json spaces',0)
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
   return;
});

app.listen(process.env['PORT'] || 3000, '127.0.0.1');

module.exports = app;
