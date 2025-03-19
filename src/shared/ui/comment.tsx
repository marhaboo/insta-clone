import { MessageCircle } from "lucide-react";

export default function Comment({size="6"}:{size?:string}){
    return <>
    <MessageCircle className={`w-${size} h-${size}`}/>
    </>
}