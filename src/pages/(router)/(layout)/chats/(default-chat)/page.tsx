"use client"

import { AppDispatch, RootState } from "@/app/store/store"
import { getChats } from "@/entities/chats/reducer/api/chat-api"
import ChatLayout from "@/widgets/chat-layout/chat-layout"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function DefaultChat() {
  const {data}=useSelector((store:RootState)=>store.chats)
  console.log(data);
  
  const dispatch=useDispatch<AppDispatch>()
  useEffect(()=>{
dispatch(getChats())
  },[dispatch])
 return <>
 <div>
 <ChatLayout/>
 </div>

 </>
}
