import { BrowserRouter, Routes, Route, Link, Outlet, useLocation } from "react-router-dom";

import Home from "./Pages/Home";
import Preview from "./Pages/Preview";
import Trending from "./Pages/Trending";
import Movies from "./Pages/Movies";
import TvShows from "./Pages/TvShows";

import "./App.css"

const Layout = () => {
  const loc = useLocation();
  if (loc.pathname.startsWith("/preview")) return <Outlet/>;
  return (
    <>
      <header>
        <Link to={"/"}><h1>StreamFLow</h1></Link>
        <nav>
          <Link to={"/"}>Home</Link>
          <Link to={"/tvshows"}>TV Shows</Link>
          <Link to={"/movies"}>Movies</Link>
        </nav>
      </header>
      <Outlet/>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" index element={<Home />} />
          <Route path="/preview/:type/:id" element={<Preview />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tvshows" element={<TvShows />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
