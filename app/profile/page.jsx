"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
      const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();

        setPosts(data);
      };

      if (session?.user.id) fetchPosts();
    }, [session?.user.id]);
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  };
  const handleDelete = async () => {};
  return (
    <Profile
      name="My"
      desc="Welcome to our personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
