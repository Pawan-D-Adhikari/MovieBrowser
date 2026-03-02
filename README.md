# 🎬 MovieBrowser

A full-stack movie discovery app built with React and Node.js, powered by the [TMDB API](https://www.themoviedb.org/). Browse trending, top-rated, and upcoming movies, search by title, filter by genre/year/rating, and view detailed info including cast and similar films.

---

## Features

- **Home feed** — Trending, Top Rated, Upcoming, and Popular movies with infinite scroll
- **Movie detail page** — Overview, cast carousel, ratings, runtime, and similar movies
- **Search** — Real-time debounced search as you type
- **Advanced filtering** — Filter by genre, release year, rating range, and sort order
- **Responsive design** — Works across all screen sizes

---

## Tech Stack

**Frontend**
- React + React Router
- Mantine UI (Carousel, Loader)
- Tailwind CSS
- Zustand (filter state)
- Axios + react-infinite-scroll-component

**Backend**
- Node.js + Express
- Axios (TMDB API proxy)
- dotenv

---

## Getting Started

### Prerequisites

- Node.js v18+
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/movie-browser.git
cd movie-browser
```

### 2. Set up the backend
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
TMDB_API_KEY=your_tmdb_api_key_here
PORT=5000
```

Start the server:
```bash
node index.js
```

### 3. Set up the frontend
```bash
cd client
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Project Structure
```
movie-browser/
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   └── movie.js          # All API calls to the backend
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Search bar + filter toggle
│   │   │   ├── MovieCard.jsx     # Reusable movie card
│   │   │   ├── ActorCard.jsx     # Cast member card
│   │   │   ├── Hero.jsx          # Featured movie banner
│   │   │   └── FilterCard.jsx    # Filter panel
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── MovieDetail.jsx
│   │   │   ├── Search.jsx
│   │   │   └── FilterResult.jsx
│   │   └── store/
│   │       └── filterStore.js    # Zustand filter state
└── server/
    ├── routes/
    │   └── movies.js             # TMDB proxy routes
    └── index.js                  # Express entry point
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies/trending` | Weekly trending movies |
| GET | `/api/movies/top_rated` | Top rated movies |
| GET | `/api/movies/upcoming` | Upcoming releases |
| GET | `/api/movies/popular?page=` | Popular movies (paginated) |
| GET | `/api/movies/search?query=&page=` | Search by title |
| GET | `/api/movies/movie?id=` | Movie details + credits |
| GET | `/api/movies/similar?id=` | Similar movies |
| GET | `/api/movies/genre` | Genre list |
| GET | `/api/movies/filter` | Filtered discovery |

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `TMDB_API_KEY` | Your TMDB API key |
| `PORT` | Server port (default: `5000`) |

---

