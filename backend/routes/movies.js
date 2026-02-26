const express = require("express");
const axios = require("axios");
const router = express.Router();

const TMDB_BASE = "https://api.themoviedb.org/3";
const KEY = process.env.TMDB_API_KEY;

// Test route
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

module.exports = router;
