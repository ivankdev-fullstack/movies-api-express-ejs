require("dotenv").config();
const express = require("express");
const request = require("request");
const router = express.Router();

const { API_BASE_URL, API_KEY, IMAGE_BASE_URL } = process.env;
const nowPlayingUrl = `${API_BASE_URL}/movie/now_playing?api_key=${API_KEY}`;

router.use((req, res, next) => {
  res.locals.imageBaseUrl = IMAGE_BASE_URL;
  next();
});

router.get("/", function (req, res, next) {
  request.get(nowPlayingUrl, (err, response, data) => {
    const parsedData = JSON.parse(data);
    res.render("index", {
      movies: parsedData.results,
    });
  });
});

module.exports = router;
