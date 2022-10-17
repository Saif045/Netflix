import React from "react";

const Video = ({ item }) => {
  return (
    <div className=" inline-flex flex-col m-2  ">
      <iframe
        id="hello"
        className="  w-full  h-full aspect-video	"
        src={`https://www.youtube.com/embed/${item.key}`}
        allowFullScreen
        title="video"></iframe>
    </div>
  );
};

export default Video;
