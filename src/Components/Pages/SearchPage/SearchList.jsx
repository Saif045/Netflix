import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiConfig from "../../../api/apiConfig";
import tmdbApi from "../../../api/tmdbApi";
import { motion as m } from "framer-motion";
import Loader from "react-loaders";

const SearchList = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(true);

  let { term } = useParams();

  useEffect(() => {
    setSearch(movies.results);
  }, [movies]);

  useEffect(() => {
    const getMovie = async () => {
      let params = { query: term };
      try {
        const response = await tmdbApi.search({ params });
        setMovies(response);
        setLoading(false);

      } catch {
        console.log("error");
      }
    };
    term && getMovie();
  }, [term]);

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
      className=" pt-24">
      <h2 className=" text-white font-bold text-2xl p-4 m-1 mt-4 text-center">
        Results
      </h2>
      <div className=" grid grid-cols-auto-fill sm:grid-cols-auto-fill-sm gap-4 2xl:container m-6 ">
        {search &&
          search.map((item, index) => {
            const link = "/" + item?.media_type + "/" + item?.id;
            return (
              item.poster_path && (
                <Link to={link} key={index}>
                  <div className="   ">
                    <img
                      className="w-full h-auto  block "
                      src={`${apiConfig.w500Image(item.poster_path)}`}
                      alt={item.title}
                    />
                  </div>
                </Link>
              )
            );
          })}
      </div>
      '<div className="text-white text-center">Page</div>
      <Loader
        type="ball-clip-rotate"
        active={loading}
        innerClassName="self-center container text-center"
      />
    </m.div>
  );
};
export default SearchList;
