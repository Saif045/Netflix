import React from "react";
import Hero from "./HomePage/Hero";
import Row from "./HomePage/Row";
import tmdbApi , { movieType, tvType } from "../../api/tmdbApi";


const Home = () => {
  return (
    <>
      <Hero />
      <Row rowID='1' category='movie' title="Up Coming Movies" fetchURL={tmdbApi.getMoviesList(movieType.upcoming)} />

      <Row rowID='2' category='tv' title="On The Air Shows" fetchURL={tmdbApi.getTvList(tvType.on_the_air)} />

      <Row rowID='3' category='movie' title="Popular Movies" fetchURL={tmdbApi.getMoviesList(movieType.popular)} />

      <Row rowID='4' category='tv' title="TopRated Shows" fetchURL={tmdbApi.getTvList(tvType.top_rated)} />

      <Row rowID='5' category='movie' title="TopRated Movies" fetchURL={tmdbApi.getMoviesList(movieType.top_rated)} />

      <Row rowID='6' category='tv' title="Popular Shows" fetchURL={tmdbApi.getTvList(tvType.popular)} />
    </>
  );
};

export default Home;
