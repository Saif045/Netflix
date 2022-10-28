import React, { createContext, useState } from "react";
import SearchList from "./SearchPage/SearchList";

export const UserContext = createContext();

const Search = () => {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [searchTerm, setsearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  console.log(toggleSearch);

  return (
    <UserContext.Provider
      value={{
        toggleSearch,
        setToggleSearch,
        searchTerm,
        setsearchTerm,
        filteredData,
        setFilteredData,
      }}>
      <SearchList />
    </UserContext.Provider>
  );
};

export default Search;
