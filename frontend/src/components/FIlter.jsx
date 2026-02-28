import { useState, useEffect } from "react";
import axios from "axios";
import { getGenre } from "../api/movie";
import { data } from "react-router-dom";

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "top_rated", label: "Top Rated" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];
const years = Array.from({ length: 100 }, (_, i) => 2026 - i);
function Filter() {
  const [genres, setGenres] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [year, setYear] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(10);
  const [sort, setSort] = useState("popular");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const GenreData = await getGenre();
        setGenres(GenreData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const toggleGenre = (id) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id],
    );

  const handleReset = () => {
    setReleaseYear("");
    setMinRating(0);
    setMaxRating(10);
    setSort("popularity");
    setSelectedIds([]);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        <div>Filter</div>
        <div>Reset</div>
      </div>
      <div className="flex flex-col">
        <div>
          <label>sort by:</label>
          <select
            id="movieFilter"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-400 rounded px-2 py-1"
          >
            <option value="popular">Most Popular</option>
            <option value="top_rated">Top Rated</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <div>
          <label>Year:</label>
          <select
            id="yearFilter"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Minimum Rating:</label>
          <input
            type="number"
            min={0}
            max={10}
            step={0.5}
            value={minRating}
            onChange={(e) => setMinRating(parseFloat(e.target.value))}
            onBlur={(e) => {
              let value = parseFloat(e.target.value);

              if (isNaN(value) || value < 0) value = 0;
              if (value > 10) value = 10;

              setMinRating(value);
            }}
          />
        </div>
        <div>
          <label>MaximumRating:</label>
          <input
            type="number"
            min={0}
            max={10}
            step={0.5}
            value={maxRating}
            onChange={(e) => setMaxRating(e.target.value)}
            onBlur={(e) => {
              let value = parseFloat(e.target.value);
              if (isNaN(value) || value > 10) value = 10;
              if (value < 0) value = 0;
              if (value < minRating) value = minRating; // prevent max < min
              setMaxRating(value);
            }}
          />
        </div>
        <div className="p-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Select Genres</h2>

          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => {
              const isSelected = selectedIds.includes(genre.id);
              return (
                <div
                  key={genre.id}
                  onClick={() => toggleGenre(genre.id)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {genre.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
