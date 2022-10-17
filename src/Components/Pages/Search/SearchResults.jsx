import React from "react";
import { Link } from "react-router-dom";
import apiConfig from "../../../api/apiConfig";

const SearchResults = ({ item }) => {
 // console.log(item);

  const link = "/" + item?.media_type + "/" + item?.id;
  return (
    <Link to={link}>
    
      <div className="   ">
        
        <img
          className="w-full h-auto  block "
          src={`${apiConfig.w500Image(item.poster_path)}`}
          alt={item.title}
        />
      </div>

    </Link>
  );
};

export default SearchResults;
