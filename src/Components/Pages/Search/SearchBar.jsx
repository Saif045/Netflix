import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tmdbApi from "../../../api/tmdbApi";
import { Link } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { MdClose } from "react-icons/md";
import axios from "axios";

const SearchBar = () => {
  const [myOptions, setMyOptions] = useState([]);

  const [wordEntered, setWordEntered] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [toggleSearch, setToggleSearch] = useState(false);
  const searchpop = () => {
    setToggleSearch(!toggleSearch);
  };

  let navigate = useNavigate();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const getMovie = async () => {
      let params = { query: wordEntered, cancelToken: cancelToken.token };
      try {
        const response = await tmdbApi.search({ params });
        setMyOptions((prev) => (prev, response.results));
      } catch {
        console.log("error");
      }
    };
    wordEntered && getMovie();

    return () => {
      cancelToken.cancel();
    };
  }, [wordEntered]);

  const handleFilter = (event) => {
    let searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = myOptions.filter((item) => {
      return item.title && item.original_language === "en";
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
    setToggleSearch(false);
  };

  const searchlink = () => {
    wordEntered && navigate("/search/" + wordEntered);
    clearInput;
  };

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
                    value={wordEntered}
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
                  {filteredData.slice(0, 15).map((item, key) => {
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
