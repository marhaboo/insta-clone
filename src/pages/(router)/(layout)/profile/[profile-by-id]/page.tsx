"use client";

import { useEffect, useState } from "react";
import HeaderWidget from "@/widgets/profile/profile-by-id/header/header";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store/store";
import { useParams } from "next/navigation";
import { getPostsById, getProfileById } from "@/entities/profile/profile-by-id/api/api";
import TabsWidget from "@/widgets/profile/profile-by-id/tab/tab";


export default function ProfileById() {
  const dispatch: AppDispatch = useDispatch();
    const [tab, setTab] = useState("posts");
  const params = useParams();
  const { data, myProfileData } = useSelector((state: RootState) => state.profileById);

  useEffect(() => {
    if (!params) return;
    const id = params["profile-by-id"] as string;
    dispatch(getProfileById(id));
    dispatch(getPostsById(id));
  }, [params, dispatch]);

  return (
    <div className="max-w-5xl mx-auto px-8 py-8">
      {data && (
        <div>
          <HeaderWidget data={data} />
          <TabsWidget tab={tab} setTab={setTab} myProfileData={myProfileData}   />
        </div>
      )}
    </div>
  );
}
