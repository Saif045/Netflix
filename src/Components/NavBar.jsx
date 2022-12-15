import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./Pages/SearchPage/SearchBar";

const NavBar = () => {


  return (
    <div className='headerDown'>
      <Link to={"/"}>
        <img
          className=" ml-6 w-28 cursor-pointer"
          src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
          alt="NETFLIX"
        />
      </Link>
      <SearchBar />
    </div>
  );
};

export default NavBar;
