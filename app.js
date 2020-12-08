const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const history = require('connect-history-api-fallback');
require('dotenv').config(); // This allows us to use variables in .env file through process.env
const isProduction = process.env.NODE_ENV === 'production'; // process.env will be used by heroku to provide configs and NODE_ENV will be set to production there.
const app = express();
const loginRouter = require('./routes/login');
const callbackRouter = require('./routes/callback');
const tokenRouter = require('./routes/token');
const indexRouter = require('./routes/index');
const session = require('express-session');

app.use(session({   
    secret: 'Visualizer',   
    resave: true,   
    saveUninitialized: true,
    username: undefined,
    password: undefined}));

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(history());
app.use(express.static(path.join(__dirname, isProduction ? 'dist' : 'public'))); // in Heroku we want dist but for dev we want public so we don't have to rebuild everytime we change something.


app.use('/', indexRouter);
app.use('/api/callback', callbackRouter);
app.use('/api/login', loginRouter);
app.use('/api/token', tokenRouter);



app.use(function (req, res, next) {
    res.status(404).send("Sorry, that didn't work! Make sure to type something in the box.")
});


module.exports = app;