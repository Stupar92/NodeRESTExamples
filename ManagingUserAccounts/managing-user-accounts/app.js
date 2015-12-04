var express          = require('express');
var path             = require('path');
var favicon          = require('serve-favicon');
var logger           = require('morgan');
var cookieParser     = require('cookie-parser');
var bodyParser       = require('body-parser');
var mongoose = require('mongoose');
var validator = require('validator');
var expressValidator = require('express-validator');

var routes = require('./routes/index');
var users = require('./routes/users');

/**
 * We do var app = exports.app = express(); instead of var app = express()
 * because supertest takes the express app that it will be testing as an argument,
 * therefore we must export our app
 */
var app = module.exports = express();

/**
 * Here we require config file where db strings are stored.
 * Then we connect to mongo providing the db string that we set
 * int 'dbUrl' variable.
 */
var config = require('./config');
app.set('dbUrl', config.db[app.settings.env]);
mongoose.connect(app.get('dbUrl'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/**
 * Express validator myst be immediately after bodyParser.
 * In old dos it says to use it like app.use(expressValidator) but it hangs on all requests
 * It must be used like : `app.use(expressValidator)`
 */
app.use(expressValidator());
app.use(cookieParser());




app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/add/:first/:second', function (req, res) {
    // convert the two values to floats and add them together
    var sum = parseFloat(req.params.first) + parseFloat(req.params.second);
    res.status(200).send(String(sum));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//module.exports = app;
