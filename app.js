const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const morgan = require('morgan');

const routes = require('./routes');

app.use(morgan('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use(routes)

app.use(function(req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    title: err.title,
    message: err.message,
    errors: err.errors,
  })
})

const server = app.listen(3000, () =>
console.log(
  `🚀 Server ready at: http://localhost:${3000}\n⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`,
),)

module.exports = app;
