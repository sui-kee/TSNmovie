"use client";

import { Suspense } from "react";
import VideoPlayer from "./clipVideo";
import { SkeletonSmClip } from "@/app/skeletons/skeletonClip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";

type videoProps = {
  id: string;
  title: string | null;
  video: string;
  likes: string[];
  link: string | null;
  createAt: Date;
  updateAt: Date;
  pageOwnerId: string;
  createdBy: any;
};
export default function ClipList() {
  const searchParams = useSearchParams();
  const pageId = searchParams.get("pageId");
  const { data, status, error } = useQuery({
    queryKey: ["page", pageId],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/pages/${pageId}/true/false/false`
        );

        return response.data;
      } catch (error) {
        alert(error);
        return error;
      }
    },
  });
  const clips = data?.clips; //destruturing clips from data
  if (error)
    return (
      <div className=" w-full h-3hundred flex justify-center items-center">
        <h3 className=" text-4xl text-red-400 m-2 uppercase">
          Opps something went wrong
        </h3>
        <FontAwesomeIcon
          icon={faArrowRotateRight}
          className=" w-[40px] cursor-pointer h-[40px] text-red-200"
        />
      </div>
    );
  return (
    <>
      <section>
        <div className=" pageWarper grid gap-3 xsm:grid-cols-3 p-2 sm:grid-cols-5 ">
          {status === "loading" &&
            [1, 2, 3, 4].map((number) => <SkeletonSmClip key={number} />)}
          {clips?.map((clip: videoProps) => (
            <Suspense fallback={<SkeletonSmClip />}>
              <VideoPlayer {...clip} key={clip.id} pageImage={data?.image} />
            </Suspense>
          ))}
        </div>
      </section>
    </>
  );
}
