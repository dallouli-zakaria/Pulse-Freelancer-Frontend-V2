const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the dist folder
app.use(express.static(__dirname + '/dist/pulse-freelancer-frontend-v2'));

// Catch all requests and send them to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + './public'+'/dist/pulse-freelancer-frontend-v2/browser/index.html'));  // Path to index.html
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
