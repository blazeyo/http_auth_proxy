const express = require('express');
const request = require('request');
const cors = require('cors')
const readlineSync = require('readline-sync');

const port = process.env.PORT || 3001;
// Remove the trailing slash.
const host = readlineSync.question('Host: ').replace(/\/$/, "");
const username = readlineSync.question('HTTP auth username: ');
const password = readlineSync.question('HTTP auth password: ', {
  hideEchoBack: true,
});
console.log('Thank you. Server is now listening on port ' + port);

const app = express();
app.use(cors());
app.use('/', function(req, res) {
  const url = host + req.url;

  console.log(url);

  const authData = {
    auth: {
      username: username,
      password: password,
    }
  };

  req.pipe(request(url, authData)).pipe(res);
});

app.listen(port);
