import React from "react";
import Credits from "./DetailsPage/Credits";
import Details from "./DetailsPage/Details";
import SimilerList from "./DetailsPage/SimilerList";
import VideoList from "./DetailsPage/VideoList";

const MovieDetails = () => {


  return (
    <div>
      <Details />
      <VideoList />
      <SimilerList />
      <Credits />
    </div>
  );
};

export default MovieDetails;
