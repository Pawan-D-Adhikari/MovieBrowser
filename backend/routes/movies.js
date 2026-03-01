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

router.get("/movie", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "id parameter is required" });
  }

  try {
    const response = await axios.get(`${TMDB_BASE}/movie/${id}`, {
      params: {
        api_key: KEY,
        append_to_response: "credits",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch movies detail" });
  }
});
router.get("/similar", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "id parameter is required" });
  }

  try {
    const response = await axios.get(`${TMDB_BASE}/movie/${id}/similar`, {
      params: {
        api_key: KEY,
        language: "en-US",
        page: 1,
      },
    });

    res.json(response.data.results);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch similar movies" });
  }
});

router.get("/filter", async (req, res) => {
  const {
    genres,
    year,
    minRating,
    maxRating,
    sort = "popular",
    page = 1,
  } = req.query;

  let genreString;

  if (Array.isArray(genres)) {
    genreString = genres.join(",");
  } else {
    genreString = genres;
  }

  let sortBy;

  switch (sort) {
    case "top_rated":
      sortBy = "vote_average.desc";
      break;
    case "newest":
      sortBy = "primary_release_date.desc";
      break;
    case "oldest":
      sortBy = "primary_release_date.asc";
      break;
    default:
      sortBy = "popularity.desc";
  }

  try {
    const response = await axios.get(`${TMDB_BASE}/discover/movie`, {
      params: {
        api_key: KEY,
        with_genres: genreString || undefined,
        primary_release_year: year || undefined,
        "vote_average.gte": minRating || undefined,
        "vote_average.lte": maxRating || undefined,
        sort_by: sortBy,
        page,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

router.get("/popular", async (req, res) => {
  const page = req.query.page || 1;
  try {
    const response = await axios.get(`${TMDB_BASE}/movie/popular`, {
      params: {
        api_key: KEY,
        page: page,
      },
    });

    res.json(response.data.results);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});

module.exports = router;
