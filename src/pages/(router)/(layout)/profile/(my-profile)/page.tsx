"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store/store";
import { getMyPost, getMyProfileUser } from "@/entities/profile/my-profile/api/api"
import HeaderWidget from "@/widgets/profile/my-profile/header/header"
import TabsWidget from "@/widgets/profile/my-profile/tab/tab"

const MyProfilePage = () => {
  const [tab, setTab] = useState("posts");
  const dispatch: AppDispatch = useDispatch();
  const { data, myProfileData } = useSelector((state: RootState) => state.myProfile);

  useEffect(() => {
    dispatch(getMyProfileUser());
    dispatch(getMyPost());
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto px-8 py-8">
      {data && <HeaderWidget data={data} /> }
      <TabsWidget tab={tab} setTab={setTab} myProfileData={myProfileData} />
    </div>
  );
};

export default MyProfilePage;