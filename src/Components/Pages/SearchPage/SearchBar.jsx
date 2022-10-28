import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import tmdbApi from "../../../api/tmdbApi";
import { Link } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { MdClose } from "react-icons/md";

const SearchBar = () => {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  let navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setToggleSearch(false);
    setSearchTerm("");
    setFilteredData([]);
  }, [pathname]);

  useEffect(() => {
    const getMovie = async () => {
      let params = { query: searchTerm };

      try {
        const response = await tmdbApi.search({ params });
        setFilteredData(
          response.results.filter((item) => {
            return item.title && item.original_language === "en";
          })
        );
      } catch {
        console.log("error");
      }
    };
    if (searchTerm.length >= 1) getMovie();
  }, [searchTerm]);

  const searchpop = () => {
    setToggleSearch(!toggleSearch);
  };

  const searchlink = () => {
    searchTerm && navigate("/search/" + searchTerm);
  };

  return (
    <div>
      <div className="searchIcon">
        {toggleSearch ? (
          <MdClose size={30} className="text-white " onClick={searchpop} />
        ) : (
          <TbSearch size={30} className="text-white " onClick={searchpop} />
        )}
        {toggleSearch && (
          <div className="absolute top-20 right-6 sm:right-20">
            <div className="min-w-full h-9">
              <div className="w-full h-full relative">
                <form onSubmit={searchlink}>
                  <input
                    className="w-full h-full pl-4 py-2"
                    type="text"
                    placeholder="Search Movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <TbSearch
                    className="absolute right-2 top-2"
                    size={20}
                    onClick={searchlink}
                  />
                </form>
              </div>
              {filteredData.length != 0 && (
                <div className="w-full h-full ">
                  {filteredData.map((item, key) => {
                    const link = "/" + item.media_type + "/" + item.id;
                    return (
                      <Link to={link} key={key}>
                        <div className="absolute  w-full h-full  bg-left bg-opacity-30 bg-black -z-50"></div>
                        <div className="absolute  w-full h-full  bg-gradient-to-r from-black -z-50"></div>
                        <p className="text-white font-bold border-b border-slate-600  max-w-3/4 h-full pl-2 p-1 pr-6">
                          {item.title}
                          <span className="ml-1">
                            (
                            {item.release_date && item.release_date.slice(0, 4)}
                            )
                          </span>
                        </p>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
