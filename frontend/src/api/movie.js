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
