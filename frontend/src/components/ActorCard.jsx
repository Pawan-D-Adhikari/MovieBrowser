import { useState } from "react";
const IMG_BASE = "https://image.tmdb.org/t/p/w300";
function ActorCard({ cast }) {
  const [error, setError] = useState(false);
  const imageURL =
    cast.profile_path && !error ? `${IMG_BASE}${cast.profile_path}` : null;

  return (
    <div className="flex flex-col  bg-zinc-900 rounded-xl overflow-hidden mb-1 cursor-pointer hover:scale-101 mt-1 ml-1 hover:ring-2 hover:ring-yellow-400 transition-all duration-200">
      <div>
        <img src={imageURL} al={cast.name} />
      </div>
      <div>
        <p className="text-sm font-semibold pl-1 text-white truncate leading-tight">
          {cast.name || "Unknown"}
        </p>
        {cast.character && (
          <p className="text-xs text-zinc-400 pl-1 truncate mt-0.5 ml-1">
            {cast.character}
          </p>
        )}
      </div>
    </div>
  );
}
export default ActorCard;
