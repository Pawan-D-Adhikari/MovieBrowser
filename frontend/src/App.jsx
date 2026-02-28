import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MovieDetail from "./pages/MovieDetail";
import Filter from "./components/FIlter";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<Filter />} />
      <Route path="/search" element={<Search />} />
      <Route path="/movie" element={<MovieDetail />} />
    </Routes>
  );
}

export default App;
