export const CONSTANTS = {
  // api keys from .env file, see ./README.md
  tmdbApiKey: `${process.env.REACT_APP_TMDB_API_KEY}`,
  giphyApiKey: `${process.env.REACT_APP_GIPHY_API_KEY}`,
  tmdbBaseUrl: "https://api.themoviedb.org/",
  giphySearchUrl: "https://api.giphy.com/v1/gifs/search",
  users: [
    { id: 0, name: "Mona", color: "#3598d9" },
    { id: 1, name: "Jasmyne", color: "#e64b3c" },
    { id: 2, name: "Aura", color: "#2acb72" },
    { id: 3, name: "Tina", color: "#f0c31d" },
  ],
  startBudget: 10,
  rentingPrice: 1.5,
  movieListLimit: 10,
};
