import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useParams } from "react-router-dom";
import tmdbApi from "../../../api/tmdbApi";
import Video from "./Video";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  let { category, id } = useParams();

  useEffect(() => {
    const getVideo = async () => {
      try {
        const response = await tmdbApi.getVideos(category, id);
        setVideos(response.results.slice(0, 5));
      } catch {
        console.log("error");
      }
    };
    getVideo();
  }, [category, id]);

  const slideLeft = () => {
    var slider = document.getElementById("slider" );
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider" );
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  return (
    <>
      <h2 className=" text-white font-bold text-2xl p-4 m-1 mt-4">Videos</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="  bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
       
          id={"slider"}
          className=" h-full w-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
          {videos.map((item, i) => (
            <Video key={i} item={item} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className=" bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  );
};

export default VideoList;
