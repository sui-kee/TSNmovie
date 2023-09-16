"use client";
import { useQuery } from "@tanstack/react-query";

import { useSession } from "next-auth/react";
import { getNotification } from "./notiApis";
import { getAllPages } from "../streamers/pageApi";

export default function NotiFications() {
  const { data: session } = useSession();
  const { data, status } = useQuery({
    queryKey: ["notification"],
    queryFn: getNotification,
  });
  const data1 = useQuery({
    queryKey: ["userPages"],
    queryFn: getAllPages,
  });
  //filt notifications for current user
  const filteredNotis = data?.filter(
    (noti: { user: string }) => session?.user.name === noti.user
  );
  return (
    <section className=" w-[80%] min-h-[80vh] max-h-[90vh] bg-white p-3 mt-8 rounded-md ">
      <h3 className=" text-xl font-bold text-fuchsia-800">Notifications</h3>
      <hr className=" border-b-2 border-b-fuchsia-500" />
      <ul className=" w-full p-2 flex justify-center flex-col">
        {filteredNotis?.map(
          (
            data: { message: string; time: string; watched: boolean },
            index: number
          ) => (
            <li
              key={index}
              className=" w-[98%] text-sm hover:text-white hover:bg-fuchsia-700 text-fuchsia-700 p-1 m-1 flex justify-between relative cursor-pointer"
            >
              <p className=" p-1">{data.message}</p>
              <small className=" p-1 text-end">{data.time}</small>
              {/* show red dot if the notification is not watched */}
              {!data.watched && (
                <span className=" w-[10px] h-[10px] rounded-full bg-red-600 absolute left-1"></span>
              )}
            </li>
          )
        )}
      </ul>
    </section>
  );
}
