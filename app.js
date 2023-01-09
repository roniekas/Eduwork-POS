let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const cors = require('cors');
const { decodeToken } = require('./middlewares/index')
const productRoutes = require('./app/product/router')
const categoryRoutes = require('./app/category/router')
const tagsRoutes = require('./app/tags/router')
const authRoutes = require('./app/auth/router')
const deliveryAddressRoutes = require('./app/deliveryAddress/router')
const cartRoutes = require('./app/cart/router')
const orderRoutes = require('./app/order/router')
const invoiceRoutes = require('./app/invoice/router')

let app = express();

// view engine setup
app.use(cors())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(decodeToken());

// Product
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tagsRoutes);
app.use('/api', deliveryAddressRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use('/api', invoiceRoutes);
app.use('/auth', authRoutes);


// HOME
app.use('/', function (req, res) {
  res.render('index', {
    title: 'Eduwork POS Services'
  })
})

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
