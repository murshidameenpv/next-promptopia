"use client";
import React, { useState,useEffect } from "react";
import { useRouter ,useSearchParams} from "next/navigation";
import Form from "@components/Form";
const UpdatePrompt = () => {
  const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
    
    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag:data.tag,
            })
        }
        if(promptId) getPromptDetails()

    }, [promptId])
    
  const updatePrompt = async (e) => {
    e.preventDefault();
      setIsSubmitting(true);
      if (!promptId) return alert(`Prompt Id Not Found in Url`)
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      isSubmitting={isSubmitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
