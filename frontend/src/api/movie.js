import axios from "axios";

const BASE = "http://localhost:5000/api/movies";

export const getTrending = async () => {
  const res = await axios.get(`${BASE}/trending`);
  return res.data.results;
};
