import { useEffect, useState } from "react";
import "../App.css";
import { getMainPageData } from "../Functions";
import { FaRegStar } from "react-icons/fa";
import { CiPlay1 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
// const imgs = ["oJ7g2CifqpStmoYQyaLQgEU32qO"];


const imgSize = 300;

function Home() {
  const nav = useNavigate()
  const [imgs, setImgs] = useState([]);
  const [popularM, setPopularM] = useState([]);
  useEffect(() => {
    getMainPageData().then((v) => {
      setImgs(v.imgs);
      setPopularM(v.movies);
    });
  }, []);
  useEffect(() => {
    console.log(popularM);
  }, [popularM]);
  return (
    <div className="App">
      {/* hero */}
      <section className="hero_section">
        <div className="scrollMovies_hero_container">
          {Array(6)
            .fill()
            .map((_, rowI) => {
              return (
                <div
                  style={{
                    animationDuration: `${20 + Math.random() * 50 + rowI * 2}s`,
                    animationDirection: rowI % 2 == 0 ? "normal" : "reverse",
                    transform: `translateY(${Math.random() * 40}%)`,
                  }}
                  className="hero_section_row"
                  key={rowI}
                >
                  {[...Array(6)].map((_, idx) => (
                    <img
                      key={idx}
                      className="movie_card_hero"
                      src={`https://image.tmdb.org/t/p/w200//${
                        imgs[idx * rowI] || imgs[0]
                      }`}
                    />
                  ))}
                </div>
              );
            })}
        </div>
        <div className="divWithHeroTitle">
          <h1><span>Stream</span> the latest hits and classic gems </h1>
          <p>
            Discover movies, shows, and live events in one lightning-fast,
            beautiful experience.{" "}
          </p>
        </div>
      </section>
      {/* trending */}
      <section className="trending_section">
        <div style={{display: 'flex', fontSize: 25, alignItems: 'end', justifyContent: 'space-between', width: '95%'}}>
          <h2>Trending now</h2>
          <a href="/trending?page=1" style={{color: '#411ba1'}}>View All</a>
        </div>
        <div className="pop_movies">
          {popularM.map((v, i) => {
            return (
              <div className="littleMovieCard" key={i} onClick={()=>nav(`/preview/movie/${v.id}`)}>
                <img src={`https://image.tmdb.org/t/p/w${imgSize}//${v.poster_path}.jpg`} />
                <div className="overImg" style={{width: imgSize, aspectRatio: "2/3"}}><CiPlay1 size={70}/></div>
                <div style={{width: '100%'}}>
                  <h3>{v.title}</h3>
                  <p style={{display: 'flex', alignItems: 'center', gap: 10}}><FaRegStar color="yellow"/>{v.vote_average.toString().split("").splice(0, 3)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Home;
