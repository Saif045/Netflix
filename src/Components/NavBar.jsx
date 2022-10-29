import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./Pages/SearchPage/SearchBar";

const NavBar = () => {
  const [color, setColor] = useState("headerUp");

  const listenScrollEvent = (event) => {
    if (window.scrollY > 0) {
      return setColor("headerDown");
    } else if (window.scrollY < 70) {
      return setColor("headerUp");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  return (
    <div className={color}>
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
