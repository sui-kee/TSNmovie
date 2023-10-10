import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { userProvider } from "../context/userContext";

export default function CreateButton({
  isCreating,
}: {
  isCreating: () => void;
}) {
  return (
    <FontAwesomeIcon
      onClick={isCreating}
      icon={faPlus}
      className="p-3 cursor-pointer flex justify-center fixed xsm:bottom-0 xsm:right-50 z-20 sm:bottom-9 sm:right-10 xsm:w-[40px] xsm:h-[20px] sm:w-[30px] sm:h-[30px] bg-green-400 xsm:rounded-lg sm:rounded-full text-white items-center"
    />
  );
}

export function CreateClipButton({ isCreating }: { isCreating: () => void }) {
  return (
    <button
      onClick={isCreating}
      title="create clip"
      className="p-2 flex justify-center absolute xsm:top-0 xsm:left-0 z-20 sm:bottom-9 sm:right-10 xsm:w-[40px] xsm:h-[20px] sm:w-[70px] sm:h-[40px] bg-fuchsia-400 rounded-br-lg text-white items-center"
    >
      <Image src={"/svgs/clips.svg"} width={40} height={40} alt="stack" />
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
}

export function CreateSeriesButton({ isCreating }: { isCreating: () => void }) {
  return (
    <button
      onClick={isCreating}
      title="create clip"
      className="p-2 flex justify-center absolute xsm:top-0 xsm:left-0 z-20 sm:bottom-9 sm:right-10 xsm:w-[40px] xsm:h-[20px] sm:w-[70px] sm:h-[40px] bg-fuchsia-400 rounded-br-lg text-white items-center"
    >
      <Image src={"/svgs/stack.svg"} width={40} height={40} alt="stack" />
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
}

export function CreateMovieButton({ isCreating }: { isCreating: () => void }) {
  return (
    <button
      onClick={isCreating}
      title="create clip"
      className="p-2 flex justify-center absolute xsm:top-0 xsm:left-0 z-20 sm:bottom-9 sm:right-10 xsm:w-[40px] xsm:h-[20px] sm:w-[70px] sm:h-[40px] bg-fuchsia-400 rounded-br-lg text-white items-center"
    >
      <Image src={"/svgs/movie.svg"} width={40} height={40} alt="stack" />
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
}

export function EditProfileButton() {
  const { userPage }: any = useContext(userProvider);
  return (
    <Link
      href={`/profile/page/editPage`}
      title="edit profile"
      className="p-3 flex justify-center absolute bottom-0 left-0 bg-slate-950 rounded-tr-2xl text-white items-center"
    >
      <FontAwesomeIcon icon={faEdit} className=" w-[30px] h-[30px]" />
    </Link>
  );
}