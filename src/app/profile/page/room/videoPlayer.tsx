"use client";
import {
  faBookmark,
  faEllipsisVertical,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
// import ReportSomething from "@/app/components/reportComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/app/firebase";
type videoProps = {
  videoSource: string;
  episode: number;
  title: string;
  image: string;
  like: number[];
  author: string;
  id: string;
  seriesId: string;
};

export default function DefaultVideoPlayer({
  videoSource,
  episode,
  title,
  image,
  like,
  author,
  id,
  seriesId,
}: videoProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [moreOption, setMoreOption] = useState<boolean>(false);
  const [hide, setHide] = useState<boolean>(true); //hide report or not boolean
  const queryClient = useQueryClient();

  // const copyLink = () => {
  //   navigator.clipboard.writeText(videoLink);
  // };
  const handleDeleteEpisode = async () => {
    const response = await axios.delete(
      `http://localhost:3000/api/episodes/${id}`
    );
    if (response.status === 200) {
      toast.success("delete successfully");
      queryClient.invalidateQueries({ queryKey: ["series"] });
    }
  };
  const { mutate, status } = useMutation({
    mutationFn: async () => {
      const videoRef = ref(storage, videoSource);
      deleteObject(videoRef)
        .then(() => handleDeleteEpisode())
        .catch((error) => {
          toast.error(error.message);
          console.log(error);
        });
    },
  });
  return (
    <>
      <div className=" likeOverlay relative max-w-fit max-h-fit  mt-4">
        <video
          width="320"
          height="240"
          controls
          ref={videoRef}
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          src={videoSource}
          key={videoSource}
          className="xsm:w-[97vw] sm:w-[70vw] h-5hundred flex justify-center shadow-[0_0_30px_purple] rounded-lg "
        />
        {/* like button */}

        {/* show user widget and like button only when the video is not playing */}
        {videoSource && !isPlaying && (
          <>
            {/* profile and backbutton */}
            <div className=" absolute top-0 left-0 flex items-center justify-between bg-fuchsia-500 p-3 rounded-t-lg w-full">
              <div className=" profile flex">
                <Link href={`/streamers/${author}`}>
                  <Image
                    src={image}
                    width={130}
                    height={130}
                    alt="bruh"
                    className=" rounded-full w-[50px] h-[50px] bg-cover "
                  />
                </Link>
                <h2 className=" m-2 text-xl">{title}</h2>
              </div>
              {/* more options button */}
              <div className=" moreOption flex flex-col">
                <FontAwesomeIcon
                  onClick={() => setMoreOption(!moreOption)}
                  icon={faEllipsisVertical}
                  className=" m-1 text-2xl cursor-pointer"
                />
                {moreOption && (
                  <ul className=" absolute origin-top-right right-1 top-[50px] rounded-md flex flex-col bg-white divide-y divide-fuchsia-600">
                    <li
                      onClick={(e) => {
                        mutate();
                        setMoreOption(!moreOption);
                        e.stopPropagation;
                      }} //copy link of video
                      className="text-black text-sm min-w-[100px] rounded-t-md text-center hover:bg-fuchsia-300 cursor-pointer p-2"
                    >
                      delete
                    </li>
                    <li
                      onClick={(e) => {
                        e.stopPropagation();
                        setMoreOption(!moreOption);
                        setHide(false);
                      }}
                      className="text-black text-sm min-w-[100px] rounded-b-md text-center hover:bg-fuchsia-300 cursor-pointer p-2"
                    >
                      report
                    </li>
                  </ul>
                )}
              </div>
            </div>
            {/* more options button end*/}

            {/* reactions buttons */}
            <div className="absolute top-[120px] right-0 flex justify-end items-end flex-col min-w-[150px] max-w-[300px] ">
              <motion.button
                whileTap={{ width: "200px" }}
                className=" flex items-center z-20 justify-start p-5 rounded-l-full  mt-2 w-[70%] bg-fuchsia-500"
                style={{ textShadow: "2px 2px 8px black" }}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  className={" text-4xl ml-3 text-white mr-2 "}
                />
                <span className=" text-white mr-1 text-2xl cursor-auto">
                  {like?.length}
                </span>
              </motion.button>
              <motion.button
                whileTap={{ width: "200px" }}
                className=" flex items-center z-20 justify-start  p-5 rounded-l-full mt-2 w-[70%] bg-fuchsia-500"
                style={{ textShadow: "2px 2px 8px black" }}
              >
                <FontAwesomeIcon
                  icon={faBookmark}
                  className={" text-4xl ml-3 text-white  mr-2 p-1"}
                />
                <span className=" text-white mr-1 text-2xl cursor-auto">0</span>
              </motion.button>
            </div>
          </>
        )}
      </div>
      {status === "pending" && (
        <div className=" fixed top-0 left-0 w-full h-full backdrop-blur-sm z-50 flex justify-center items-center">
          <h3 className="text-white text-4xl">Deleting....</h3>
        </div>
      )}
      {/* <AnimatePresence>
        {!hide && <ReportSomething handleVisibillity={() => setHide(true)} />}
      </AnimatePresence> */}
    </>
  );
}
