"use client"
import { getReels } from "@/entities/reels/api/reels-api";
import { Bookmark, Ellipsis, Heart, MessageCircle, SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Reels() {
  const {reels} = useSelector((store) => store.reels)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getReels())
  }, [dispatch])
  
  console.log(reels)

   return (
     <>
      <h1 className="text-center text-white p-4">Reels Page</h1>
      <div className="flex flex-col gap-10 items-center">
        {reels?.map((reel) => (
        <div key={reel?.postId} className="relative w-[420] h-[90vh]   overflow-hidden rounded-[8px] shadow-[8px]" >
         <video src={`https://instagram-api.softclub.tj/images/${reel?.images}`} autoPlay  muted
              className="object-cover  w-full h-full"></video>
               <div className="absolute bottom-[40px] right-5 mt-[50%] flex flex-col gap-6 items-center">
              <Heart size={32} className="text-black " />
                 <p className="text-black absolute top-[30px]">500</p>
              <MessageCircle  size={29} className="text-black mt-[10px]" />
                 <p className="text-black absolute top-[95px]">500</p>
              <SquareArrowOutUpRight size={26} className="text-black   mt-[10px]" />
              <Bookmark size={26} className="text-black" />
                <Ellipsis size={32} className="text-black " />
            </div>
              <div className="absolute bottom-[80px] left-5 flex items-center gap-3">
              <Image src="avatar.jpg" alt="" className="w-10 h-10 rounded-[20px] border-2 border-black"/>
              <h1 className="text-black font-bold">nyrose . </h1>
              <button className="border-2 border-black p-1 rounded w-[120px] ">подписаться</button>
             
            </div>
          
            </div>
          
        ))}
      </div>
    </>
  );
}