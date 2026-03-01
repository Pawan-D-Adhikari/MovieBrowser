import axios from "axios";

const BASE = "http://localhost:5000/api/movies";

export const getTrending = async () => {
  const res = await axios.get(`${BASE}/trending`);
  return res.data.results;
};

export const getTopRated = async () => {
  const res = await axios.get(`${BASE}/top_rated`);
  return res.data;
};

export const getUpcoming = async () => {
  const res = await axios.get(`${BASE}/upcoming`);
  return res.data;
};
export const getGenre = async () => {
  const res = await axios.get(`${BASE}/genre`);
  return res.data.genres;
};

export const searchMovies = async (query, page = 1) => {
  try {
    const res = await axios.get(`${BASE}/search`, {
      params: { query, page },
    });

    return res.data.results;
  } catch (error) {
    console.error("Search API error:", error);
    throw error;
  }
};

export const getMovieDetail = async (id) => {
  try {
    const res = await axios.get(`${BASE}/movie`, {
      params: { id },
    });
    return res.data;
  } catch (error) {
    console.error("Search API error:", error);
    throw error;
  }
};
export const getSimilarMovies = async (id) => {
  try {
    const res = await axios.get(`${BASE}/similar`, {
      params: { id },
    });
    return res.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getFilteredMovies = async (filters) => {
  try {
    const res = await axios.get(`${BASE}/filter`, {
      params: {
        sort: filters.sort,
        year: filters.year,
        minRating: filters.minRating,
        maxRating: filters.maxRating,
        genres: filters.genres,
      },
    });

    return res.data.results;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const getPopular = async (page = 1) => {
  try {
    const res = await fetch(`${BASE}/popular?page=${page}`);
    const data = await res.json();
    return data || [];
  } catch (err) {
    console.error("Failed to fetch popular movies:", err);
    return [];
  }
};
