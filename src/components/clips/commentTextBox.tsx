import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChildrenComment from "./childComment";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import DeleteComment from "../deleteComment";
import { userProvider } from "@/app/context/userContext";
import { useContext } from "react";

export default function CommentTextBox({
  comment,
  handleReplying,
}: {
  comment: any;
  handleReplying: (id: string, user: any, author: any) => void;
}) {
  const { user }: any = useContext(userProvider);
  return (
    <li className=" w-full max-h-fit flex justify-start mb-2">
      <img
        src={comment?.user.image}
        alt="image"
        className=" w-[40px] h-[40px] bg-fuchsia-500 rounded-full"
      />
      <div
        className="w-full relative  max-h-fit flex flex-col justify-start ml-2"
        style={{ height: "fit-content" }}
      >
        <small className=" text-sm text-fuchsia-700 ">
          {comment?.user?.firstName + " " + comment?.user?.lastName}
        </small>
        <p className="w-full max-h-fit bg-fuchsia-500 text-white text-sm rounded-xl p-2">
          {comment.text}
        </p>
        {/* option... */}
        <div className="flex relative justify-start items-center">
          <button
            onClick={() => handleReplying(comment.id, user, comment?.user)}
            className="flex justify-start m-1 "
          >
            <FontAwesomeIcon
              icon={faReply}
              className=" w-[20px] h-[20px] text-fuchsia-500"
            />
            <i className="text-fuchsia-500 text-sm ">Reply</i>
          </button>
          {comment.user.id === user.id && (
            <DeleteComment commentId={comment.id} />
          )}
        </div>
        {comment.childComments.length === 0 ? null : (
          <ChildrenComment
            parentId={comment.id}
            handleReplying={handleReplying}
          />
        )}
      </div>
    </li>
  );
}
