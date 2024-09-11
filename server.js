const express = require('express');
const path = require('path');
const app = express();

// Move the app.listen statement before everything else
app.listen(process.env.PORT || 8080);

// Serve static files
app.use(express.static(__dirname + '/dist/pulse-freelancer-frontend-v2'));

// Handle all routes
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/pulse-freelancer-frontend-v2/browser/index.html'));
});
