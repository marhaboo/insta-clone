"use client"  

import type { AppDispatch, RootState } from "@/app/store/store"  
import { getChats } from "@/entities/chats/reducer/api/chat-api"  
import { useEffect } from "react"  
import { useDispatch, useSelector } from "react-redux"  
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"  
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"  
import { ScrollArea } from "@/shared/ui/scroll-area"  
import { useRouter } from "next/navigation"

interface Chat {  
  chatId: string;  
  sendUserImage?: string;  
  sendUserName: string;  
}  

interface ChatsState {  
  data: Chat[];  
}  

export default function ChatLayout() {  
    const router=useRouter()
  const { data } = useSelector((store: RootState) => store.chats) as ChatsState;  
  const dispatch = useDispatch<AppDispatch>();  

  useEffect(() => {  
    dispatch(getChats());  
  }, [dispatch]);  

  return (  
    <div className="w-full max-w-sm border-r h-screen">  
      <Tabs defaultValue="messages" className="w-full">  
        <TabsList className="w-full">  
          <TabsTrigger value="messages" className="flex-1">  
            Сообщения  
          </TabsTrigger>  
          <TabsTrigger value="requests" className="flex-1">  
            Запросы  
          </TabsTrigger>  
        </TabsList>  
        <TabsContent value="messages" className="m-0">  
          <ScrollArea className="h-[calc(100vh-48px)]">  
            <div className="flex flex-col">  
              {data?.map((chat) => (  
                <div onClick={()=>router.push(`/chats/${chat.chatId}`)} key={chat.chatId} className="flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer">  
                  <Avatar className="h-12 w-12">  
                    <AvatarImage  
                      src={chat.sendUserImage ? `https://instagram-api.softclub.tj/images/${chat.sendUserImage}` : undefined}  
                      alt={chat.sendUserName}  
                    />  
                    <AvatarFallback>{chat.sendUserName.substring(0, 2).toUpperCase()}</AvatarFallback>  
                  </Avatar>  
                  <div className="flex flex-col flex-1 min-w-0">  
                    <div className="flex justify-between items-center">  
                      <span className="font-medium truncate">{chat.sendUserName}</span>  
                      <span className="text-xs text-muted-foreground whitespace-nowrap">1 нед.</span>  
                    </div>  
                    <span className="text-sm text-muted-foreground truncate">  
                    </span>  
                  </div>  
                </div>  
              ))}  
            </div>  
          </ScrollArea>  
        </TabsContent>  
        <TabsContent value="requests"></TabsContent>  
      </Tabs>  
    </div>  
  )  
}