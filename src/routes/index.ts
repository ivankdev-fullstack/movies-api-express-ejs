import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import * as movieService from "../services/movie.service";
dotenv.config();

export const router = express.Router();

const { IMAGE_BASE_URL } = process.env;

router.get("/", async (req: Request, res: Response) => {
  try {
    const movies = await movieService.getNowPlayingMovies();
    res.render("index", { movies, imageBaseUrl: IMAGE_BASE_URL });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/movie/:id", async (req: Request, res: Response) => {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    res.render("single-movie", { movie });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/search", async (req: Request, res: Response) => {
  try {
    const movies = await movieService.searchMovies(
      req.body.cat,
      req.body.movieSearch
    );
    res.render("index", { movies });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
