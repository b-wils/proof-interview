const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
app = express();

app.get('/api/ping', (req, res) => {
	res.send('hello world!')
})

// Serve Vue Files
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 8080;
app.listen(port);

console.log('Listening on port ' + port)