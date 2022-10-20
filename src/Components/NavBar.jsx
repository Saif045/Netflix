import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./Pages/Search/SearchBar";

const NavBar = () => {
  return (
    <div className="mt-4 flex items-center justify-between p-4 z-[100] w-full absolute top-0">
      <Link to={"/"}>
        <img
          className=" sm:ml-6 w-28 cursor-pointer"
          src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
          alt="NETFLIX"
        />
      </Link>
      <SearchBar />
    </div>
  );
};

export default NavBar;

{
  /*       <div className="sm:mr-6">
        <button className="text-white pr-2 sm:pr-4 text-sm hidden sm:inline-flex">
          Sign in
        </button>
        <button className="bg-red-600 px-2 sm:px-4 py-2 rounded cursor-pointer text-white text-sm">
          Sign up
        </button>
      </div>
     */
}
