require("dotenv").config();
const express = require("express");
const request = require("request");
const router = express.Router();

const { API_BASE_URL, MOVIES_BASE_URL, API_KEY, IMAGE_BASE_URL } = process.env;
const nowPlayingUrl = `${MOVIES_BASE_URL}&api_key=${API_KEY}`;

router.use((req, res, next) => {
  res.locals.imageBaseUrl = IMAGE_BASE_URL;
  next();
});

router.get("/", function (req, res) {
  request.get(nowPlayingUrl, (err, response, data) => {
    const parsedData = JSON.parse(data);
    console.log(parsedData);

    res.render("index", {
      movies: parsedData.results,
    });
  });
});

router.get("/movie/:id", (req, res) => {
  const movieId = req.params.id;
  const thisMovieUrl = `${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;

  request.get(thisMovieUrl, (err, response, data) => {
    const movie = JSON.parse(data);
    res.render("single-movie", {
      movie,
    });
  });
});

router.post("/search", (req, res) => {
  const cat = req.body.cat;
  const userSearchTerm = encodeURI(req.body.movieSearch);
  const movieUrl = `${API_BASE_URL}/search/${cat}?query=${userSearchTerm}&api_key=${API_KEY}`;

  request.get(movieUrl, (err, response, data) => {
    let movies = JSON.parse(data);
    if (cat == "person") {
      movies.results = parsedData.results[0].known_for;
    }
    res.render("index", {
      movies: movies.results,
    });
  });
});

module.exports = router;
