import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiConfig from "../../../api/apiConfig";
import tmdbApi, { movieType } from "../../../api/tmdbApi";
import Loader from "react-loaders";
import { motion as m } from "framer-motion";

const Hero = () => {
  let navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    const getMovies = async () => {
      const params = {};
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        setMovies(response.results);
        setLoading(false);
      } catch {
        console.log("error");
      }
    };
    getMovies();
  }, []);

  const shortenString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const movielink = () => {
    navigate("/movie/" + movie?.id);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { type: "easeIn", duration: 0.8 },
    },
  };

  return (
    <m.div
      variants={container}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0 }}
      className="  w-full h-screen   text-white">
      <div className="w-full h-full">
        <div className="absolute  w-full h-screen  bg-gradient-to-r from-black">
          {" "}
        </div>
        <img
          className="w-full h-full object-cover  "
          src={
            movie?.backdrop_path
              ? `${apiConfig.originalImage(movie?.backdrop_path)}`
              : ""
          }
          alt={movie?.title}
        />

        <div className="absolute  w-full top-[25%]  p-4 md:p-8  xs:max-w-[75%] sm:max-w-[65%] md:max-w-[60%] lg:max-w-[50%] xl:max-w-[45%] 2xl:max-w-[30%]">
          <h1 className=" text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="my-4">
            <button
              onClick={movielink}
              className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
              Play
            </button>

            <button className="border text-white border-gray-300 py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>
          <div className="inline-flex">
            <p className="text-gray-400 text-sm  flex">
              Released: {movie?.release_date.slice(0, 4)}{" "}
              <span className="mx-1">|</span>
            </p>
            <p className="text-gray-400 text-sm">
              Rating: {movie?.vote_average.toString().slice(0, 3)}
            </p>
          </div>
          <p className="w-full   md:max-w-[80%]">
            {shortenString(movie?.overview, 150)}
          </p>
        </div>
      </div>

      <Loader
        type="ball-clip-rotate"
        active={loading}
        innerClassName="self-center container text-center"
      />
    </m.div>
  );
};

export default Hero;
