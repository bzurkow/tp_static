// 'use strict';
const express = require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('../db');
const routes = require('../routes');

const app = express();

// templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(routes);

app.use(express.static(path.join(__dirname, '../public')));
app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, '../node_modules/jquery/dist')));

app.use((req, res, next) => {
	var err = new Error('Not Found');
	err.status = 404;
	next(err)
})

app.use("/", (err, req, res, next) => {
	res.status(err.status || 500);
	console.error(err)
	res.render(err)
})

db.sync()
.then(function () {
  app.listen(3000, function () {
    console.log('Listening on port 3000');
  });
})
.catch(console.error);
