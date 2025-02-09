import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const { API_BASE_URL, API_KEY } = process.env;

export const getNowPlayingMovies = async () => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
    );

    return data?.results || [];
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw new Error("Failed to fetch now playing movies.");
  }
};

export const getMovieById = async (movieId: string) => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    );
    return data;
  } catch (error) {
    console.error(`Error fetching movie ${movieId}:`, error);
    throw new Error("Failed to fetch movie details.");
  }
};

export const searchMovies = async (category: string, searchTerm: string) => {
  try {
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const { data } = await axios.get(
      `${API_BASE_URL}/search/${category}?query=${encodedSearchTerm}&api_key=${API_KEY}`
    );

    if (category === "person" && data.results.length > 0) {
      return data.results[0]?.known_for || [];
    }

    return data?.results || [];
  } catch (error) {
    console.error("Error performing search:", error);
    throw new Error("Failed to search movies.");
  }
};
