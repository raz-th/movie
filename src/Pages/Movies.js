import React, { useEffect, useRef, useState } from "react";
import { allPopular, getGenres, getMoviesByGenre } from "../Functions";
import { FaInfoCircle, FaPlay, FaRegStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CiPlay1 } from "react-icons/ci";
import Loading from "./Loading";

const imgSize = 300;

export default function Movies() {
  const [chosenMovie, setChosenMovie] = useState(null);
  const [list, setList] = useState(null);
  const nav = useNavigate();
  useEffect(() => {
    allPopular(1).then((v) => {
      const r = Math.floor(Math.random() * 16);
      setChosenMovie(v[r]);
    });

    getGenres().then(async (g) => {
      const lists = await Promise.all(
        g.map(async (v) => {
          const d = await getMoviesByGenre(v.id);
          return { name: v.name, items: d };
        })
      );

      setList(lists);
    });
  }, []);

  if (chosenMovie === null) return <Loading/>;
  if (list === null) return <Loading/>;
  // if (true) return <Loading/>
  return (
    <div className="moviesPage">
      <section className="moviesPage_hero">
        <img
          src={`https://image.tmdb.org/t/p/original//${chosenMovie.backdrop_path}`}
        />
        <div className="fadeImg" />
        <div className="fadeImg fadeImg2">
          <div className="cc">
            <h1>{chosenMovie.title}</h1>
            <p style={{ marginTop: 10 }}>
              <FaRegStar style={{ marginRight: 10 }} color="yellow" />
              {chosenMovie.vote_average.toString().split("").slice(0, 3)}{" "}
              <span style={{ fontWeight: 900, marginLeft: 20 }}>
                {chosenMovie.release_date.split("-")[0]}
              </span>
            </p>
            <p style={{ maxHeight: "50%", fontSize: 20, marginTop: 30 }}>
              {chosenMovie.overview}
            </p>
            <div style={{ display: "flex", gap: 50, marginTop: 50 }}>
              <button className="playBtn btn">
                <FaPlay /> Play
              </button>
              <button className="downloadBtn btn" onClick={() => nav(`/preview/movie/${chosenMovie.id}`)}>
                <FaInfoCircle /> More Info
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="moviesPage_categories">

        {list.map((film, iF) => {
          if (film.items == 0) return null;
          return (
            <div key={iF}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "99%" }}>
                <h1 style={{ marginBottom: 20, marginTop: 20 }}>{film.name}</h1>
                <Link>View All</Link>
              </div>
              <div className="cat_movi">
                {film.items.map((v, i) => {
                  return (
                    <div
                      className="littleMovieCard"
                      key={v.id}
                      onClick={() => nav(`/preview/movie/${v.id}`)}
                    >
                      <div className="poster-wrapper">
                        <img
                          src={`https://image.tmdb.org/t/p/w${imgSize}/${v.poster_path}`}
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
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
