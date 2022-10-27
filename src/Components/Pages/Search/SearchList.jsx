import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiConfig from "../../../api/apiConfig";
import tmdbApi from "../../../api/tmdbApi";

const SearchList = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState([]);
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
      } catch {
        console.log("error");
      }
    };
    term && getMovie();
  }, [term]);

  return (
    <div className=" pt-24">
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
    </div>
  );
};
export default SearchList;
