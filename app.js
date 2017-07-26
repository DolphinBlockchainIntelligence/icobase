const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const basicAuth = require('express-basic-auth');


const app = express();

let mongo = {ObjectID: require('mongodb').ObjectID};

let index = require('./routes/index')(mongo);
let form = require('./routes/form')(mongo);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(basicAuth({
    users: {},
    challenge: true,
    realm: ''
}));

app.use('/', index);
app.use('/form/', form);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = function(cb) {
    MongoClient.connect('', (err, db) => {
        if (err) {
            console.log(err);
            process.exit();
        }
        mongo.mongo = db.collection('');
        cb(app);
    });
};