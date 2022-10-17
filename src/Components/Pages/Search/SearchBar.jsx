import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tmdbApi from "../../../api/tmdbApi";
import { Link } from "react-router-dom";
import { TbSearch } from "react-icons/tb";


const SearchBar = () => {
  const [myOptions, setMyOptions] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const getMovie = async () => {
      let params = { query: wordEntered };
      try {
        const response = await tmdbApi.search({ params });
        setMyOptions(response.results);
      } catch {
        console.log("error");
      }
    };
    wordEntered && getMovie();
  }, [wordEntered]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = myOptions.filter((item) => {
      return item.title && item.original_language=== 'en'
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
  };

  const searchlink = () => {
    navigate("/search/" + wordEntered);
  };

  console.log(filteredData);

  return (
    <div className="min-w-full h-9">
      <div className="w-full h-full relative">
        <input
          className="w-full h-full pl-4"
          type="text"
          placeholder="Search Movies"
          value={wordEntered}
          onChange={handleFilter}
          
        />
        <TbSearch className="absolute right-2 top-2" size={20} onClick={searchlink}/>
        
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
  );
};

export default SearchBar;
