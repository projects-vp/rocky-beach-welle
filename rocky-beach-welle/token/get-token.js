const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();
app.use(cors());
const axios = require("axios");

const client_id = "42b059cb4a9c4321a4915dd189018185";
const client_secret = "68a7cf119df74223b40d1585eb476f2a";

const refreshToken =
  "AQA7h6RHUfMcOiaqXf-EKRy-zyQwwvSZjDbGrzZzKpqdPaQVA2yb9ft0MUsyThDAdV4D2EZgW4x7IlMznp4uxsa1c7g0MqkW6R0tePQhBPfnS-n4kJqJd2V45e_220aY-Qs";

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
      var access_token = body.access_token,
        refresh_token = body.refresh_token || refresh_token;
      res.send({
        access_token: access_token,
        refresh_token: refresh_token,
      });
    }
  });
});

app.listen(3002, () => {
  console.log("Listening on 3002");
});
