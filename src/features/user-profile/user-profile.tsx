"use client"
import ProfileUser from "@/shared/ui/profile-user";  
import { jwtDecode } from "jwt-decode";  
import { useRouter } from "next/navigation";

export default function UserProfile() {  
    const router=useRouter()
    const token = localStorage.getItem("access_token");  

    let decoded: any;  
    if (token) {  
        const trimmedToken = token.slice(1, -1); 
        decoded = jwtDecode(trimmedToken);  
    }  

    return (  
        <div onClick={()=>router.push("/profile")}>   
            <ProfileUser size="md" img={decoded?.sub} userName={decoded?.name} userNickname={decoded?.email}  />  
        </div>  
    );  
}