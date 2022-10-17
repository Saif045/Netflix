import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiConfig from "../../../api/apiConfig";
import tmdbApi from "../../../api/tmdbApi";

const Details = () => {
  const [movies, setMovies] = useState([]);
  let { category, id } = useParams();


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

  // console.log(movies)

  return (
    <div className=" text-white ">
      <div className="absolute  w-full h-full  bg-gradient-to-r from-black">
        {" "}
      </div>
      <img
        className=" h-screen w-full object-cover"
        src={
          movies.backdrop_path
            ? `${apiConfig.originalImage(movies.backdrop_path)}`
            : ""
        }
      />

      <div className="absolute w-full top-[30%] 2xl:top-[40%] p-4 md:p-8 sm:max-w-[65%] md:max-w-[60] lg:max-w-[50%] xl:max-w-[40%] 2xl:max-w-[35%] ">
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
          <p className="text-gray-400 text-sm hidden sm:flex">
            Released: {movies?.release_date} <span className="mx-1">|</span>
          </p>
          <p className="text-gray-400 text-sm">
            Rating: {movies?.vote_average}
          </p>
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
    </div>
  );
};

export default Details;
