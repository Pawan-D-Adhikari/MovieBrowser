import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MovieDetail from "./pages/MovieDetail";
import FilterResult from "./pages/FIlterResult";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/movie" element={<MovieDetail />} />
      <Route path="/filter" element={<FilterResult />} />
    </Routes>
  );
}

export default App;
