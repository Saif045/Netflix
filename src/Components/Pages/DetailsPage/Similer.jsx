import React from "react";
import { Link, useParams } from "react-router-dom";
import apiConfig from "../../../api/apiConfig";

const Similer = ({ item }) => {
  let { category } = useParams();

  const link = "/" + category + "/" + item?.id;


  return (
    <Link to={link} >
      <div className="   ">
        <img
          className="w-full h-auto  block "
          src={item?.poster_path && `${apiConfig.w500Image(item?.poster_path)}`}
          alt={item?.title}
        />
      </div>
    </Link>
  );
};

export default Similer;
