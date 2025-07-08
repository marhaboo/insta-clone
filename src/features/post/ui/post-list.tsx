"use client";

import { useEffect, useState } from "react";
import { axiosRequest } from "@/shared/utils/axiosRequest";
import { Post, PostData } from "../post";
import jwtDecode, { JwtPayload } from "jwt-decode";
import UserApi from "../api/user-api";

interface CustomJwtPayload extends JwtPayload {
  sid: string;
}

export default function PostList() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [profile, setProfile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("access_token")?.slice(1, -1);
      if (!token) {
        console.error("No access token found in local storage.");
        setIsLoading(false);
        return;
      }

      let decoded: CustomJwtPayload;
      try {
        decoded = jwtDecode<CustomJwtPayload>(token);
      } catch (decodeError) {
        console.error("Invalid token", decodeError);
        setIsLoading(false);
        return;
      }

      try {
        const response = await axiosRequest.get("/Post/get-posts?PageSize=10");
        // Предполагаем, что response.data.data — массив постов
        const dataPosts = response.data.data as unknown[];

        const profileUser = await UserApi(decoded.sid);
        setProfile(profileUser);

        const transformedPosts: PostData[] = dataPosts.map((postObj) => {
          // Уточним тип postObj как any (если есть точный тип, лучше заменить)
          const post = postObj as {
            postId: number;
            images: string[];
            [key: string]: unknown;
          };
          return {
            ...post,
            media: post.images.map((image) => ({
              type: image.endsWith(".mp4") ? "video" : "image",
              url: `https://instagram-api.softclub.tj/images/${image}`,
            })),
          };
        });

        setPosts(transformedPosts);
      } catch (fetchError) {
        console.error("Failed to fetch posts:", fetchError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-100 dark:bg-gray-800 mx-auto rounded-lg w-full max-w-xl h-[600px] animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6">
      {posts.length > 0 ? (
        posts.map((post) => <Post profile={profile} key={post.postId} post={post} />)
      ) : (
        <p className="text-center text-gray-500">No posts available.</p>
      )}
    </div>
  );
}
