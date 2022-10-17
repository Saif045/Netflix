import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import apiConfig from "../api/apiConfig";

const Movie = ({ item, category }) => {
  const [like, setlike] = useState(false);
  const link = "/" + category + "/" + item?.id;

  return (
    <Link to={link}>
      {item?.poster_path && 
        <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
          <img
            className="w-full h-auto block"
            src={
              item?.poster_path && `${apiConfig.w500Image(item?.poster_path)}`
            }
            alt={item?.title}
          />
          <div className=" absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
            <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
              {item.title} {item?.original_name}
            </p>
            <p>
              {like ? (
                <FaHeart className="absolute top-4 left-4 text-gray-300" />
              ) : (
                <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
              )}
            </p>
          </div>
        </div>
      }
    </Link>
  );
};

export default Movie;
