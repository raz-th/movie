import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movieData, tvshowData } from "../Functions";
import { FaPlay, FaRegStar } from "react-icons/fa";
import { IoMdAdd, IoMdDownload, IoMdShare } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { IoArrowBack, IoShareSocialOutline } from "react-icons/io5";
// https://image.tmdb.org/t/p/w200//
export default function Preview() {
  const nav = useNavigate();
  const { id, type } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    if (type == "movie") {
      movieData(id).then((v) => {
        setData(v);
      });
    } else if (type == "tvshow") {
      tvshowData(id).then((v) => {
        setData(v);
      });
    }
  }, []);
  if (!data) return <h1 color="#fff">LOADING...</h1>;
  return (
    <div className="previewPage">
      <section className="hero_preview">
        <button className="goBackBtn" onClick={() => nav("/")}>
          <IoArrowBack />
        </button>
        <img
          src={`https://image.tmdb.org/t/p/original//${data.main.backdrop_path}`}
        />
        <div className="imgFade">
          <div className="imgFade_content">
            <h1>{type === "movie" ? data.main.title : data.main.name}</h1>
            <p>
              <FaRegStar style={{ marginRight: 10 }} color="yellow" />
              {data.main.vote_average.toString().split("").slice(0, 3)}{" "}
              <span style={{ fontWeight: 900, marginLeft: 20 }}>
                {type === "movie"
                  ? data.main.release_date.split("-")[0]
                  : data.main.first_air_date.split("-")[0]}
              </span>
              <span style={{ fontWeight: 900, marginLeft: 20 }}>
                {type === "movie"
                  ? `${parseInt(data.main.runtime / 60)}h 
                ${parseInt(
                  (data.main.runtime / 60 - parseInt(data.main.runtime / 60)) *
                    60
                )}m`
                  : `${data.main.seasons.length} Seasons`}
              </span>
            </p>
            <div
              style={{
                display: "flex",
                gap: 20,
                marginTop: 40,
                marginBottom: 40,
              }}
            >
              <button className="playBtn btn">
                <FaPlay /> Play
              </button>
              <button className="downloadBtn btn">
                <IoMdDownload /> Download
              </button>
              <button className="downloadBtn btn-circle">
                <IoMdAdd />
              </button>
              <button className="downloadBtn btn-circle">
                <AiOutlineLike />
              </button>
              <button className="downloadBtn btn-circle">
                <IoShareSocialOutline />
              </button>
            </div>
            <div className="imgFade_content_des">
              <p style={{ fontSize: 25 }}>{data.main.overview}</p>
              <div className="imgFade_content_des_cards">
                <div className="castCard" style={{ height: "max-content" }}>
                  <p style={{ color: "#6b7280ff" }}>CAST</p>
                  <p style={{ fontSize: 20, textAlign: "left" }}>
                    {data.credits.cast
                      .sort((a, b) => a.popularity < b.popularity)
                      .slice(0, 5)
                      .map((v, i) => v.name)
                      .join(", ")}
                  </p>
                  <p style={{ color: "#6b7280ff" }}>GENRES</p>
                  <p style={{ fontSize: 20, textAlign: "left" }}>
                    {data.main.genres.map((v, i) => v.name).join(", ")}
                  </p>
                </div>
              </div>
            </div>
            {type === "tvshow" && (
              <div className="castCard2">
                <p style={{ color: "#6b7280ff" }}>SEASONS</p>
                {data.main.seasons.map((v, i) => {
                  return (
                    <div key={i} className="carcon">
                      <img
                      style={{width: 100}}
                        src={`https://image.tmdb.org/t/p/w200//${v.poster_path}`}
                      />
                      <div>
                        <h2>{v.name}</h2>
                        <p>{v.overview}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
