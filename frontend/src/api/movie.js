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
