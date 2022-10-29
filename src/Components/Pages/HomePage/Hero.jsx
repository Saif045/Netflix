import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiConfig from "../../../api/apiConfig";
import tmdbApi, { movieType } from "../../../api/tmdbApi";

const Hero = () => {
  let navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    const getMovies = async () => {
      const params = {};
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        setMovies(response.results);
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

  return (
    <div className=" w-full hero-container   text-white">
      <div className="w-full h-full">
        <div className="absolute  w-full hero-container  bg-gradient-to-r from-black">
          {" "}
        </div>
        <img
          className="w-full h-full object-cover "
          src={
            movie?.backdrop_path
              ? `${apiConfig.originalImage(movie?.backdrop_path)}`
              : ""
          }
          alt={movie?.title}
        />

        <div className="absolute w-full top-[30%] p-4 md:p-8 sm:max-w-[65%] md:max-w-[60%] lg:max-w-[50%] xl:max-w-[45%] 2xl:max-w-[30%]">
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
          <p className="w-full  md:max-w-[80%]">
            {shortenString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
