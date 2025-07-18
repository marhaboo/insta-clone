"use client";

import { AppDispatch, RootState } from "@/app/store/store";
import { getChatsById } from "@/entities/chats/reducer/api/chat-api";
import ChatLayout from "@/widgets/chat-layout/chat-layout";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function ChatById() {
  const params=useParams()
  const {data}=useSelector((store:RootState)=>store.chatsById)
  const dispatch=useDispatch<AppDispatch>()
  const id = params["chat-by-id"] as string;
  console.log(id);
  useEffect(()=>{
  dispatch(getChatsById(id))
  },[dispatch,id])
  console.log(data);
  
 return <>
 <div>
 <ChatLayout/>

 </div>
 </>

}
