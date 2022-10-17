import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../../api/tmdbApi";

const Credits = () => {
  const [credits, setCredits] = useState([]);
  let { category, id } = useParams();

  useEffect(() => {
    const getVideo = async () => {
      try {
        const response = await tmdbApi.credits(category, id);
        setCredits(response);
      } catch {
        console.log("error");
      }
    };
    getVideo();
  }, []);

  return <div className="text-white"></div>;
};

export default Credits;
