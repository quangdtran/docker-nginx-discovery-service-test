var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const senecaService = require('seneca')({ legacy: { meta: true } })
  .use('seneca-amqp-transport')
  .client({
    type: 'amqp',
    pin: 'service:api,action:*',
    url: 'amqp://guest:guest@rabbitmq:5672',
  })
  .ready(() => {
    const util = require('util');
    const senecaAct = util.promisify(senecaService.act.bind(senecaService));
    senecaAct({ service: 'api', action: 'test', body: { id: '123456' } })
      .then((result) => console.log(result))
      .catch((err) => console.log(err.toString()));
    
    app.listen(3001, () => console.log('API service on 3001'));
  });
