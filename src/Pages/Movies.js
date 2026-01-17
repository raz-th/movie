import React, { useEffect, useRef, useState } from "react";
import { allPopular, getGenres, getMoviesByGenre } from "../Functions";
import { FaInfoCircle, FaPlay, FaRegStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CiPlay1 } from "react-icons/ci";

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

  if (chosenMovie === null) return <h1>LOADING</h1>;
  if (list === null) return <h1>LOADING</h1>;
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
            <p style={{ width: "80%", fontSize: 20, marginTop: 30 }}>
              {chosenMovie.overview}
            </p>
            <div style={{ display: "flex", gap: 50, marginTop: 50 }}>
              <button className="playBtn btn">
                <FaPlay /> Play
              </button>
              <button className="downloadBtn btn" onClick={()=>nav(`/preview/movie/${chosenMovie.id}`)}>
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
              <div style={{display: 'flex', justifyContent:'space-between', alignItems: 'center', width: "99%"}}>
                <h1 style={{ marginBottom: 20, marginTop: 20 }}>{film.name}</h1>
                <Link>View All</Link>
              </div>
              <div className="cat_movi">
                {film.items.map((v, i) => {
                  return (
                    <div
                      className="littleMovieCard"
                      key={i}
                      onClick={() => nav(`/preview/movie/${v.id}`)}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w${imgSize}//${v.poster_path}.jpg`}
                      />
                      <div
                        className="overImg"
                        style={{ width: imgSize, aspectRatio: "2/3" }}
                      >
                        <CiPlay1 size={70} />
                      </div>
                      <div style={{ width: "100%" }}>
                        <h3>{v.title}</h3>
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <FaRegStar color="yellow" />
                          {v.vote_average.toString().split("").splice(0, 3)}
                        </p>
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
