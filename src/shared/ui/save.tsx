import { Bookmark } from "lucide-react";

export default function Save({size="6"}:{size?:string}){
    return <>
    <Bookmark className={`w-${size} h-${size}`}/>
    </>
}