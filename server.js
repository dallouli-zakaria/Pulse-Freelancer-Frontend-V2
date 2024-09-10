const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the Angular app's 'dist' directory
app.use(express.static('dist/pulse-freelancer-frontend-v2'));

// Redirect all requests to the Angular app's 'index.html'
app.get('/*', function(req, res) {
  res.sendFile('index.html',{root:'dist/pulse-freelancer-frontend-v2/'});
});

// Start the app by listening on the default Heroku port or port 8080
app.listen(process.env.PORT || 8080, () => {
  console.log('Server is running');
});
