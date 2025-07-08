"use client";
import { AppDispatch, RootState } from "@/app/store/store";
import { usersApi } from "@/entities/users/api/users-api";
import ProfileUser from "@/shared/ui/profile-user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
interface InterProf {
  id: number;
  avatar: string;
  fullName: string;
  userName: string;
}
export default function ReccomendBlock() {
  const { users } = useSelector((store: RootState) => store.users);
const router=useRouter()
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(usersApi());
  }, [dispatch]);
  return (
    <>
      {users.map((el: InterProf) => {
        return (
          <div onClick={()=>router.push(`/profile/${el.id}`)} key={el.id} className="m-4 w-">
            <ProfileUser
            size="sm"
              img={el.avatar}
              userName={el.fullName}
              userNickname={el.userName}
            />
          </div>
        );
      })}
    </>
  );
}
