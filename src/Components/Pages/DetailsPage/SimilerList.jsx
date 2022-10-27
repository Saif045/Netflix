import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import tmdbApi from "../../../api/tmdbApi";
import apiConfig from "../../../api/apiConfig";

const SimilerList = () => {
  const [similer, setSimiler] = useState([]);
  let { category, id } = useParams();

  useEffect(() => {
    const getVideo = async () => {
      try {
        const response = await tmdbApi.similar(category, id);
        setSimiler(response.results);
      } catch {
        console.log("error");
      }
    };
    getVideo();
  }, [category, id]);

  return (
    <div>
      <h2 className=" text-white font-bold text-2xl p-4 m-1 mt-4 text-center">
        Similer
      </h2>
      <div className=" grid grid-cols-auto-fill sm:grid-cols-auto-fill-sm gap-4 2xl:container m-6 ">
        {similer.map((item, index) => {
          const link = "/" + category + "/" + item?.id;
          return (
            <Link to={link} key={index}>
              <div className="   ">
                <img
                  className="w-full h-auto  block "
                  src={
                    item?.poster_path &&
                    `${apiConfig.w500Image(item?.poster_path)}`
                  }
                  alt={item?.title}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SimilerList;
