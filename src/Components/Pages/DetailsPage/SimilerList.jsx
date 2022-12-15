import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import tmdbApi from "../../../api/tmdbApi";
import apiConfig from "../../../api/apiConfig";
import { motion as m } from "framer-motion";

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { type: "easeIn", duration: 0.8 },
    },
  };

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
              <m.div
                variants={container}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0 }}
                className="   ">
                <img
                  className="w-full h-auto  block "
                  src={
                    item?.poster_path &&
                    `${apiConfig.w500Image(item?.poster_path)}`
                  }
                  alt={item?.title}
                />
              </m.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SimilerList;
