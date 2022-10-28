import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import MovieDetails from "./Components/Pages/MovieDetails";
import Home from "./Components/Pages/Home";
import Search from "./Components/Pages/Search";
import  from "./Components/pages/ScrollToTop";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:term" element={<Search />} />
        <Route path="/:category/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
};

export default App;
