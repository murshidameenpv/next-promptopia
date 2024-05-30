"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
const PromptCard = ({ post, handleTagClick, handleDelete, handleEdit }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession()
  const pathname = usePathname()
  const router = useRouter()
  const handleCopy = () => {
    setCopied(post.prompt)
    //copy to clip board
    navigator.clipboard.writeText(post.prompt)
    setTimeout(()=>setCopied(""),3000)
  }
  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-slate-900">
              {post.creator.userName}
            </h3>
            <p className="font-inter text-sm text-slate-700">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={13}
            height={13}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-slate-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue _gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user.id === post.creator._id && pathname === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
