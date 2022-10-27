import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tmdbApi from "../../../api/tmdbApi";
import { Link } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { MdClose } from "react-icons/md";
import axios from "axios";

const SearchBar = () => {
  const [myOptions, setMyOptions] = useState([]);

  const [searchTerm, setsearchTerm] = useState("");

  const [filteredData, setFilteredData] = useState([]);

  const [toggleSearch, setToggleSearch] = useState(false);

  const searchpop = () => {
    setToggleSearch(!toggleSearch);
  };

  let navigate = useNavigate();

  useEffect(() => {
    const getMovie = async () => {
      let params = { query: searchTerm };

      try {
        const response = await tmdbApi.search({ params });
        setMyOptions(response.results);
      } catch {
        console.log("error");
      }
    };

    if (searchTerm.length >= 1) getMovie();

    return () => setMyOptions([]);
  }, [searchTerm]);

  const clearInput = () => {
    setFilteredData([]);
    setsearchTerm("");
    setToggleSearch(false);
  };

  const searchlink = () => {
    searchTerm && navigate("/search/" + searchTerm);
    clearInput;
  };

  const handleFilter = (event) => {
    let searchWord = event.target.value;
    setsearchTerm(searchWord);
  };
  const newFilter = myOptions.filter((item) => {
    return item.title && item.original_language === "en";
  });
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  }, [searchTerm]);

  console.log(myOptions);

  return (
    <div>
      <div className="searchIcon">
        {toggleSearch ? (
          <MdClose size={30} className="text-white " onClick={searchpop} />
        ) : (
          <TbSearch size={30} className="text-white " onClick={searchpop} />
        )}
        {toggleSearch && (
          <div className="absolute right-20">
            <div className="min-w-full h-9">
              <div className="w-full h-full relative">
                <form onSubmit={searchlink}>
                  <input
                    className="w-full h-full pl-4 py-2"
                    type="text"
                    placeholder="Search Movies"
                    value={searchTerm}
                    onChange={handleFilter}
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
                      <Link to={link} onClick={clearInput} key={key}>
                        <div className="absolute  w-full h-full  bg-left bg-opacity-30 bg-black -z-50"></div>
                        <div className="absolute  w-full h-full  bg-gradient-to-r from-black -z-50"></div>
                        <p className="text-white font-bold border-b max-w-3/4 h-full pl-2 p-1 pr-6">
                          {item.title}
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
