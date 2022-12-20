import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiConfig from "../../../api/apiConfig";
import tmdbApi from "../../../api/tmdbApi";
import { motion as m } from "framer-motion";
import Loader from "react-loaders";



const Details = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  let { category, id } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setLoading(true)
  }, [id]);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await tmdbApi.detail(category, id);
        setMovies(response);
      

      } catch {
        console.log("error");
      }
    };
    getMovie();
  }, [category, id]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { type: "easeIn", duration: 0.8 },
    },
  };


  return (
    <m.div   variants={container}
    initial="hidden"
    animate="show"
    exit={{ opacity: 0 }} className="w-full h-[92vh]  text-white ">
      <div className="absolute  w-full  h-[92vh] bg-gradient-to-r from-black">
        {" "}
      </div>
      <img
        className=" h-[92vh] w-full object-cover"
        onLoad={()=>setLoading(false)}
        src={
          movies.backdrop_path
            ?  `${apiConfig.originalImage(movies.backdrop_path)} `
            : ""
        }
      />

      <div className="absolute w-full top-[30%] 2xl:top-[40%] p-4 md:p-8 sm:max-w-[65%] md:max-w-[60%] lg:max-w-[50%] xl:max-w-[40%] 2xl:max-w-[35%] ">
        <h1 className=" text-3xl md:text-4xl lg:text-5xl font-bold">
          {" "}
          {movies?.original_name}
          {movies?.title}
        </h1>
        <div className="my-4">
          {movies?.homepage && (
            <a href={movies?.homepage} target="_blank">
              <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5 mr-4">
                Play
              </button>
            </a>
          )}
          <button className="border text-white border-gray-300 py-2 px-5">
            Watch Trailer
          </button>
        </div>
        <div className="inline-flex">
          {movies?.release_date && (
            <p className="text-gray-400 text-sm hidden sm:flex">
              Released: {movies?.release_date.slice(0, 4)}
              <span className="mx-1">|</span>
            </p>
          )}

          {movies?.vote_average && (
            <p className="text-gray-400 text-sm">
              Rating: {movies?.vote_average.toString().slice(0, 3)}
            </p>
          )}

          {movies?.number_of_seasons && movies?.number_of_episodes && (
            <p className="text-gray-400 text-sm">
              <span className="mx-1">|</span> S: {movies?.number_of_seasons}{" "}
              <span className="mx-1">|</span> EP: {movies?.number_of_episodes}
            </p>
          )}
        </div>
        <p className="w-full  md:max-w-[80%] xl:max-w-[80%] 2xl:max-w-[85%]">
          {movies?.overview}
        </p>
      </div>
      <Loader
        type="ball-clip-rotate"
        active={loading}
        innerClassName="self-center container text-center"
      />
    </m.div>
  );
};

export default Details;
