import React, { useEffect, useState } from "react";
import { allPopular } from "../Functions";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
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
                <p style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <FaRegStar color="yellow" />
                  {v.vote_average.toString().split("").splice(0, 3)}
                </p>
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
