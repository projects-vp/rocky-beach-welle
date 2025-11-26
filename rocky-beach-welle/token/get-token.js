const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();
app.use(cors());
require("dotenv").config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;

let currentAccessToken = null;

app.get("/refresh_token", function (req, res) {
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      currentAccessToken = body.access_token;
      res.send({
        access_token: currentAccessToken,
        refresh_token: refreshToken,
      });
    } else {
      res.status(response.statusCode).send(body);
    }
  });
});

app.listen(3002, () => {
  console.log("Listening on 3002");
});

