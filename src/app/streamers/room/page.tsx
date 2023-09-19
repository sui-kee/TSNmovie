import AdminPage from "./adminPage";
import CatagoryNavbar from "./catagoryOfMovie";
import { Suspense } from "react";
import AdminSkeleton from "@/app/skeletons/adminPageSkeleton";
import { NormalSkeleton } from "@/app/skeletons/skeletonStreamer";
import MainList from "./main";

export default async function ProfilePage() {
  return (
    <div className="pageWarper flex flex-col justify-center text-white ">
      <Suspense fallback={<AdminSkeleton />}>
        <AdminPage />
      </Suspense>
      <main className=" flex flex-col items-center w-full bg-black ">
        <MainList />
        {/* <MovieSearchBar /> */}
      </main>
    </div>
  );
}
