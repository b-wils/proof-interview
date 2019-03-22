require('dotenv').config()
const express = require('express');
const  bodyParser = require('body-parser');
const serveStatic = require("serve-static")
const path = require('path');
const mongoose = require('mongoose');

// Bootstrap models
require('./server/db/file')

// Route handlers
const createFile = require('./server/routes/createFile')
const listFiles = require('./server/routes/listFiles')
const findFileBySlug = require ('./server/routes/findFileBySlug')
const showFile = require ('./server/routes/showFile')
const updateFile = require('./server/routes/updateFile')
const deleteFile = require('./server/routes/deleteFile')

// configure db
let uri = process.env.MONGODB_URI;

mongoose.connect(uri);

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback() {

})

app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/ping', (req, res) => {
	res.send('hello world!')
})

app.get('/api/files', listFiles)
app.post('/api/files', createFile)
app.get('/api/files/:fileSlug', showFile)
app.put('/api/files/:fileSlug', updateFile)
app.delete('/api/files/:fileSlug', deleteFile)

app.param('fileSlug', findFileBySlug);

// Serve Vue Files
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 8080;
app.listen(port);

console.log('Listening on port ' + port)