'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const { resolve } = require('path');

const app = express();

module.exports = app
	.use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

	.use(express.static(resolve(__dirname, '..', 'public')))

	.use('/api', require('./api'))

	.get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

const port = 3000;
app.listen(port, () => {
	console.log('The server is listening on port', port);
})

