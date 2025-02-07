require("dotenv").config();
const express = require("express");
const request = require("request");
const router = express.Router();

const { API_BASE_URL, API_KEY } = process.env;

const nowPlayingUrl = `${API_BASE_URL}/movie/now_playing?api_key=${API_KEY}`;

router.get("/", function (req, res, next) {
  request.get(nowPlayingUrl, (err, res, data) => {
    const parsedData = JSON.parse(data);
  });
  res.render("index", { title: "Express" });
});

module.exports = router;
