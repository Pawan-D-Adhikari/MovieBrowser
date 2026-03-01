import { useState, useEffect } from "react";
import { getGenre } from "../api/movie";
import { useNavigate } from "react-router-dom";

const years = Array.from({ length: 100 }, (_, i) => 2026 - i);

function FilterCard() {
  const [genres, setGenres] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [year, setYear] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(10);
  const [sort, setSort] = useState("popular");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleApply = () => {
    const params = new URLSearchParams();

    params.set("sort", sort);

    if (year) params.set("year", year);

    if (minRating !== 0) params.set("minRating", minRating.toString());

    if (maxRating !== 10) params.set("maxRating", maxRating.toString());

    if (selectedIds.length > 0) params.set("genres", selectedIds.join(","));

    navigate(`/filter?${params.toString()}`);
  };
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
    setYear("");
    setMinRating(0);
    setMaxRating(10);
    setSort("popular");
    setSelectedIds([]);
  };

  return (
    <div className="flex flex-col w-100 gap-6 mx-auto px-4 py-3 bg-gray-950 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <p className="text-white font-bold text-lg">Filter</p>
        <div
          onClick={handleReset}
          className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer select-none"
        >
          Reset
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {/* Sort By */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-bold text-sm">Sort By</label>
          <select
            id="movieFilter"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="popular">Most Popular</option>
            <option value="top_rated">Top Rated</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {/* Year */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-bold text-sm">Year</label>
          <select
            id="yearFilter"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Range */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-white font-bold text-sm">Min Rating</label>
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
              className="w-full bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-white font-bold text-sm">Max Rating</label>
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
                if (value < minRating) value = minRating;
                setMaxRating(value);
              }}
              className="w-full bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-col gap-3">
          <p className="text-white font-bold text-sm">Genres</p>
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
                      : "bg-gray-900 text-gray-400 border-gray-700 hover:border-blue-500 hover:text-white"
                  }`}
                >
                  {genre.name}
                </div>
              );
            })}
          </div>
        </div>
        <div
          onClick={handleApply}
          className=" flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold  cursor-pointer py-2 rounded-lg transition-colors"
        >
          Apply Filters
        </div>
      </div>
    </div>
  );
}

export default FilterCard;
