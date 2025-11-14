const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();
app.use(cors());
const axios = require('axios');

const client_id = '42b059cb4a9c4321a4915dd189018185';
const client_secret = '68a7cf119df74223b40d1585eb476f2a';

/* Nur um den Refresh Token mir zu holen, wird später entfernt */
app.get('/login', (req, res) => {
  const scope = 'user-read-private user-read-email';
  const redirect_uri = 'http://127.0.0.1:3002/callback';

  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
  res.redirect(authUrl);
});


app.get('/callback', async (req, res) => {
  const code = req.query.code;

  const response = await axios.post('https://accounts.spotify.com/api/token',
    new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://127.0.0.1:3002/callback',
    }),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      auth: {
        username: client_id,
        password: client_secret,
      },
    }
  );

  const { access_token, refresh_token } = response.data;
  res.send({ access_token, refresh_token });
});
/* Ende erster Login um mir den token zu holen */
app.get('/refresh_token', function(req, res) {

  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token,
          refresh_token = body.refresh_token || refresh_token;
      res.send({
        'access_token': access_token,
        'refresh_token': refresh_token
      });
    }
  });
});

app.listen(3002, () => {
  console.log('Listening on 3002');
});
