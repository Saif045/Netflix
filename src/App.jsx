import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import MovieDetails from "./Components/Pages/MovieDetails";
import Home from "./Components/Pages/Home";
import Search from "./Components/Pages/Search";
import { AnimatePresence } from "framer-motion";

const App = () => {
  return (
    <>
    
      <NavBar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/search/:term" element={<Search />} />
          <Route path="/:category/:id" element={<MovieDetails />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
