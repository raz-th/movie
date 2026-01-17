const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDFhMmU4YjBmMGE4YTg3NjJmNTdkMDZjNzY0MThiNCIsIm5iZiI6MTc2NDYwNTA0NC44NDA5OTk4LCJzdWIiOiI2OTJkYmM3NDFjM2U1MWUwNmQyODY4MmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.SlvOwgwLIpzc8aBkdDQRBspilbjzHFBe4FwawO-pQI8",
  },
};


export const getMainPageData = async () => {
  const popularUrl =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

  try {
    const res = await fetch(popularUrl, options);
    const json = await res.json();

    // Filter out invalid poster paths
    const imgs = json.results.map((m) => m.poster_path).filter(Boolean);

    return { imgs, movies: json.results.slice(0, 5) };
  } catch (err) {
    console.error("Error fetching movies:", err);
    return []; // safe fallback, function ALWAYS returns something
  }
};

export const allPopular = async (page = 1) => {
  const popularUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  

  try {
    const res = await fetch(popularUrl, options);
    const json = await res.json();

    return json.results;
  } catch (err) {
    console.error("Error fetching movies:", err);
    return []; // safe fallback, function ALWAYS returns something
  }
};

export const allPopularTv = async (page = 1) => {
  const popularUrl = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`;
  

  try {
    const res = await fetch(popularUrl, options);
    const json = await res.json();

    return json.results;
  } catch (err) {
    console.error("Error fetching movies:", err);
    return []; // safe fallback, function ALWAYS returns something
  }
};
export const movieData = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const urlCredits = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  

  try {
    const res = await fetch(url, options);
    const json = await res.json();

    const res2 = await fetch(urlCredits, options);
    const json2 = await res2.json();

    return { main: json, credits: json2 };
  } catch (err) {
    console.error("Error fetching movie:", err);
    return []; // safe fallback, function ALWAYS returns something
  }
};

export const tvshowData = async (id) => {
  const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
  const urlCredits = `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`;
  

  try {
    const res = await fetch(url, options);
    const json = await res.json();

    const res2 = await fetch(urlCredits, options);
    const json2 = await res2.json();

    return { main: json, credits: json2 };
  } catch (err) {
    console.error("Error fetching movie:", err);
    return []; // safe fallback, function ALWAYS returns something
  }
};

export async function getGenres() {
  const list = require("./permanentData/genre-list.json");
  return list.genres;
}

export async function getMoviesByGenre(genreId, page = 1) {
  const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=${page}`;

  const res = await fetch(url, options);
  const data = await res.json();
  return data.results.slice(0, 5);
}

export async function getTvByGenre(genreId, page = 1) {
  const url = `https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}&sort_by=popularity.desc&page=${page}`;

  const res = await fetch(url, options);
  const data = await res.json();
  return data.results.slice(0, 5);
}