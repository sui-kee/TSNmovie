"use client";
import React, { Suspense, useEffect, useState } from "react";
import VideoPlayer from "./clipsVideoPlayer";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import SkeletonClip from "../skeletons/skeletonClip";

import SpinLoading from "../components/spinLoading";
import axios from "axios";
import Uploading from "../components/uploading";
import CreateClips from "./createClips";
import CreateButton from "./floatingCreateBtn";
import { ClipLoading } from "../components/loading";
import { useInView } from "react-hook-inview";

type videoPageProp = {
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

export default function VideoComponent() {
  const queryClient = useQueryClient();
  const [ref, inView] = useInView();
  const [isCreating, setIsCreating] = useState(false);

  // queryClient.invalidateQueries({ queryKey: ["clips"] });
  const {
    data,
    status,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["clips"],
    queryFn: async ({ pageParam = 0 }) => {
      try {
        const response = await axios.get(
          `https://yokeplay.vercel.app/api/clips/cursor?cursor=${pageParam}`
        );
        const data = response.data;
        return data;
      } catch (error) {
        return error;
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <>
      <main className="pageWarper flex flex-col justify-center items-center overflow-auto ">
        {status === "loading" && <SkeletonClip />}
        {status === "error" && (
          <div className=" min-w-fit min-h-fit flex justify-center items-center xsm:h-[300px] sm:w-[600px] sm:h-[400px]  ">
            <h1 className=" text-4xl text-red-400 min-w-fit min-h-fit text-center ">
              Opps there is an error:(
            </h1>
          </div>
        )}
        {data?.pages?.map((page) => (
          <React.Fragment key={page.nextCursor}>
            {page.clips.map((video: videoPageProp, index: number) => (
              <Suspense fallback={<SkeletonClip key={index} />} key={video.id}>
                <VideoPlayer {...video} key={video.id} />
              </Suspense>
            ))}
          </React.Fragment>
        ))}
        {/* button for creating clips */}
        <CreateButton isCreating={() => setIsCreating(!isCreating)} />
        {/* creating widget for clips */}
        {isCreating && (
          <CreateClips isCreating={() => setIsCreating(!isCreating)} />
        )}
        {hasNextPage && (
          <div ref={ref}>
            <ClipLoading />
          </div>
        )}
      </main>
    </>
  );
}
