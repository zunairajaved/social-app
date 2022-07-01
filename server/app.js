// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// const mongoose = require('mongoose');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var config = require('./config');
// const url = config.mongoUrl;

// var app = express();

// const connect = mongoose.connect(url);

// connect.then((db) => {
//     console.log("Connected correctly to server");
// }, (err) => { console.log(err); });

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
// var passport = require('passport');

// var authenticate = require('./authenticate');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
// var categoriesRouter = require('./routes/categories');
// var foodCategoriesRouter = require('./routes/foodCategories');
// var MenuRouter = require('./routes/menues');
// var RestaurantsRouter = require('./routes/restaurants');
// var orderRouter = require('./routes/orders')

var config = require('./config');
const url = config.mongoUrl;

var app = express();

const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(passport.initialize());
 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
// app.use('/categories',categoriesRouter);
// app.use('/foodCategories',foodCategoriesRouter);
// app.use('/menues',MenuRouter);
// app.use('/restaurants',RestaurantsRouter);
// app.use('/orders',orderRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;