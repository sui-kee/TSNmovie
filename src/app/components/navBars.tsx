"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function NavBar() {
  const { data: session } = useSession();
  const router = useRouter();
  // console.log("id ", session?.user.id);
  const { data, status } = useQuery({
    queryKey: ["user", session?.user?.email],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${session?.user.email}`
        );
        const data = response.data;
        return data;
      } catch (error) {
        return error;
      }
    },
  });
  //checking if the user has page ,if exist push to profile path

  return (
    <>
      <nav className="pageWarper text-white z-40 flex b justify-between bg-none items-center mainNav fixed right-0 left-0 backdrop-blur-sm top-0">
        <Link href={"/"} className=" font-mono text-fuchsia-600 ml-3">
          <Image
            src={"/mycon.png"}
            alt="icon"
            width={100}
            height={100}
            className="w-[40px] h-[40px] "
          />
        </Link>

        <Link
          href={"/clips"}
          className={
            " p-1 mainNavLink flex sm:flex-row xsm:flex-col justify-center items-center"
          }
        >
          <Image
            src={"/svgs/clips.svg"}
            width={100}
            height={100}
            alt="clips"
            className="w-[30px] h-[30px]"
          />
          <h4 className=" xsm:hidden sm:flex">clips</h4>
        </Link>
        <Link
          href={"/notifications"}
          className={
            " p-1 mainNavLink flex sm:flex-row xsm:flex-col items-center "
          }
        >
          <Image
            src={"/svgs/noti.svg"}
            width={100}
            height={100}
            alt="clips"
            className="w-[30px] h-[30px] "
          />
          <h4 className=" xsm:hidden sm:flex">notifications</h4>
        </Link>
        <Link
          href={"/streamers"}
          className={
            " p-1 mainNavLink flex sm:flex-row xsm:flex-col items-center "
          }
        >
          <Image
            src={"/svgs/streamers.svg"}
            width={100}
            height={100}
            alt="clips"
            className="w-[30px] h-[30px] "
          />
          <h4 className=" xsm:hidden sm:flex">streamers</h4>
        </Link>
        <Link
          href={"/profile"}
          className=" flex justify-center p-1 mainNavLink item sm:flex-row xsm:flex-cols-center"
        >
          {session ? (
            <>
              <span className=" text-fuchsia-400 xsm:hidden sm:block text-lg p-1">
                {session?.user?.name}
              </span>
              <Image
                width={400}
                height={400}
                alt="haih"
                src={`${session?.user?.image as string}`}
                className=" rounded-full bg-cover xsm:w-[24px] xsm:h-[24px] sm:w-[40px] sm:h-[40px] "
              />
            </>
          ) : (
            <span className=" text-lg text-white">Profile</span>
          )}
        </Link>
      </nav>
    </>
  );
}
