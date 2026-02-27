const express = require("express");
const axios = require("axios");
const router = express.Router();

const TMDB_BASE = "https://api.themoviedb.org/3";
const KEY = process.env.TMDB_API_KEY;

router.get("/trending", async (req, res) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE}/trending/movie/week?api_key=${KEY}`,
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/top_rated", async (req, res) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE}/movie/top_rated?api_key=${KEY}`,
    );
    res.json(response.data.results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch top rated movies" });
  }
});

router.get("/upcoming", async (req, res) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE}/movie/upcoming?api_key=${KEY}`,
    );
    res.json(response.data.results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch upcoming movies" });
  }
});

router.get("/genre", async (req, res) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE}/genre/movie/list?api_key=${KEY}&language=en-US`,
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch genres" });
  }
});
router.get("/search", async (req, res) => {
  console.log("Search route hit");
  const { query, page = 1 } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await axios.get(`${TMDB_BASE}/search/movie`, {
      params: {
        api_key: KEY,
        query,
        page,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

module.exports = router;
