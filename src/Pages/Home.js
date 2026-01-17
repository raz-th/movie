import { useEffect, useState } from "react";
import { getMainPageData } from "../Functions";
import { FaRegStar, FaPlay } from "react-icons/fa"; // Swapped CiPlay1 for FaPlay for better standard look
import { useNavigate } from "react-router-dom";

const IMG_SIZE = 300; // Standard w300 for posters

function Home() {
  const nav = useNavigate();
  const [data, setData] = useState({ imgs: [], movies: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMainPageData()
      .then((v) => {
        setData(v);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data", err);
        setLoading(false);
      });
  }, []);

  // Helper to ensure images loop correctly and don't crash if undefined
  const getSafeImage = (list, index) => {
    if (!list || list.length === 0) return "";
    return list[index % list.length];
  };

  return (
    <div className="App">
      {/* HERO SECTION */}
      <section className="hero_section">
        {/* Background Scrolling Animation */}
        <div className="scrollMovies_hero_container">
          {Array(6)
            .fill()
            .map((_, rowI) => (
              <div
                style={{
                  animationDuration: `${30 + rowI * 5}s`, // More predictable timing
                  animationDirection: rowI % 2 === 0 ? "normal" : "reverse",
                  transform: `translateY(${Math.random() * 20 - 10}%)`, // Smaller random offset
                }}
                className="hero_section_row"
                key={rowI}
              >
                {/* Increased array size to make the scroll look denser */}
                {[...Array(10)].map((_, idx) => (
                  <img
                    key={idx}
                    className="movie_card_hero"
                    src={`https://image.tmdb.org/t/p/w200/${getSafeImage(data.imgs, idx + rowI)}`}
                    alt="Background Movie"
                    loading="lazy"
                  />
                ))}
              </div>
            ))}
        </div>

        {/* Hero Text Content */}
        <div className="divWithHeroTitle">
          <div className="hero-content">
            <h1>
              <span>Stream</span> the latest hits and classic gems
            </h1>
            <p>
              Discover movies, shows, and live events in one lightning-fast,
              beautiful experience.
            </p>
            <div className="hero-buttons">
               <button className="btn-primary" onClick={() => nav('/trending?page=1')}>
                 Browse Movies
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING SECTION */}
      <section className="trending_section">
        <div className="section-header">
          <h2>Trending Now</h2>
          <button className="view-all-btn" onClick={() => nav("/trending?page=1")}>
            View All
          </button>
        </div>

        {loading ? (
          <div className="loading-grid">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton-card"></div>
            ))}
          </div>
        ) : (
          <div className="pop_movies">
            {data.movies.map((v) => (
              <div 
                className="littleMovieCard" 
                key={v.id} 
                onClick={() => nav(`/preview/movie/${v.id}`)}
              >
                <div className="poster-wrapper">
                  <img 
                    src={`https://image.tmdb.org/t/p/w${IMG_SIZE}/${v.poster_path}`} 
                    alt={v.title} 
                    loading="lazy"
                  />
                  <div className="overImg">
                    <div className="play-icon-circle">
                      <FaPlay />
                    </div>
                  </div>
                </div>
                
                <div className="movie-info">
                  <h3>{v.title}</h3>
                  <div className="rating">
                    <FaRegStar className="star-icon" />
                    <span>{v.vote_average.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;