import React, { useEffect, useState } from "react";
import { allPopular } from "../Functions";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlay, FaRegStar } from "react-icons/fa";
import { CiPlay1 } from "react-icons/ci";

const imgSize = 300;

export default function Trending() {
  const [data, setData] = useState(null);
  const nav = useNavigate();
  const loc = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(loc.search);
    allPopular(params.get("page")).then((v) => setData(v));
  }, [loc.search]);
  if (!data) return <h1>LOADING...</h1>;
  return (
    <div className="viewTrendingDiv">
      <div className="moviesContainer">
        {data.map((v, i) => {
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
      <button
        onClick={() => {
          const params = new URLSearchParams(loc.search);
          const currentPage = parseInt(params.get("page") || "1", 10);
          params.set("page", currentPage + 1);
          nav(`?${params.toString()}`);
        }}
      >
        Next Page
      </button>
    </div>
  );
}
