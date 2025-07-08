"use client"
import { useEffect, useState } from "react"  
import { axiosRequest } from "@/shared/utils/axiosRequest"  
import { Post, PostData } from "../post"  
import { jwtDecode, JwtPayload } from "jwt-decode";  
import UserApi from "../api/user-api";  

interface CustomJwtPayload extends JwtPayload {  
  sid: string;  
}   

export default function PostList() {  
  const [posts, setPosts] = useState<PostData[]>([]);  
  const [profile, setProfile] = useState("");  
  const [isLoading, setIsLoading] = useState(true);  
  
  const token = localStorage.getItem("access_token")?.slice(1, -1);  
  let decode: CustomJwtPayload;  

  if (token) {  
    decode = jwtDecode<CustomJwtPayload>(token);  
  } else {  
    console.error("No access token found in local storage.");  
  }  

  useEffect(() => {  
    const fetchPosts = async () => {  
      if (!token) return;   
      
      try {  
        const { data } = await axiosRequest.get("/Post/get-posts?PageSize=10");  
        const profileUser = await UserApi(decode.sid);  
        setProfile(profileUser);  
        
        const transformedPosts: PostData[] = data.data.map((post: unknown) => ({  
          ...post,  
          media: post.images.map((image: string) => ({  
            type: image.endsWith(".mp4") ? "video" : "image",  
            url: `https://instagram-api.softclub.tj/images/${image}`,  
          })),  
        }));  

        setPosts(transformedPosts);  
      } catch (error) {  
        console.error("Failed to fetch posts:", error);  
      } finally {  
        setIsLoading(false);  
      }  
    };  
   
    fetchPosts();  
  }, [token]); 

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