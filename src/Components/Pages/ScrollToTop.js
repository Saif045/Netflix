import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "./Search";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  const {searchTerm, setsearchTerm}= useContext(UserContext);
  const {filteredData, setFilteredData} = useContext(UserContext);

  const {toggleSearch , setToggleSearch} = useContext(UserContext);


  useEffect(() => {
    window.scrollTo(0, 0);
      setFilteredData([]);
      setsearchTerm("");
      setToggleSearch(false);

  }, [pathname]);

  return null;
}