"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/shared/ui/button";
import { Settings } from "lucide-react";
import defaultImg from "@/app/assets/images/profile/default-profile.svg";
import {
  setEditModal,
  setFollowersModal,
  setFollowingsModal,
} from "@/entities/profile/my-profile/reducers/profile-slice";
import type { UserProfile } from "@/entities/profile/profile-by-id/models/types";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store/store";
import { FollowersModal } from "../followersModal/followersModal";
import { FollowingModal } from "../followingsModal/followingsModal";
import Note from "@/features/profile/note/note";
import PhotoEdit from "@/features/profile/photo-edit/photo-edit";
import { useRouter } from "next/navigation";

const HeaderWidget = ({ data }: { data: Partial<UserProfile> }) => {
  const baseImageUrl = "https://instagram-api.softclub.tj/images/";
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const user: UserProfile = {
    id: data?.id || "",
    userName: data?.userName || "",
    image: data?.image ? `${baseImageUrl}${data.image}` : defaultImg,
    postCount: data?.postCount || 0,
    followersCount: data?.subscribersCount || 0,
    followingCount: data?.subscriptionsCount || 0,
    about: data?.about || "",
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center md:flex-row md:items-center gap-6 p-4 relative -mt-6"
      >
        <motion.div className="relative group">
          <Note />
          <div
            className="relative"
            onClick={() => dispatch(setEditModal(true))}
          >
            <Image
              src={user.image}
              alt="Profile"
              width={160}
              height={160}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-gray-300 shadow-md"
            />
          </div>
        </motion.div>

        <motion.div className="flex flex-col items-center md:items-start">
          <motion.div className="flex items-center gap-4 mb-2">
            <h1 className="text-xl font-semibold">{user.userName}</h1>
            <Button className="bg-gray-200 px-4 py-2 text-sm">
              Редактировать профиль
            </Button>
            <Button className="bg-gray-200 px-4 py-2 text-sm">
              Посмотреть архив
            </Button>
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Settings
                onClick={() => router.push("/settings")}
                className="w-5 h-5 cursor-pointer text-gray-600"
              />
            </motion.div>
          </motion.div>

          <motion.div className="flex justify-center align-center gap-6 text-sm">
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <strong>{user.postCount}</strong> публикаций
            </motion.span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => dispatch(setFollowersModal(true))}
            >
              <strong>{user.followersCount}</strong> подписчиков
            </motion.button>
            <motion.button
              onClick={() => dispatch(setFollowingsModal(true))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <strong>{user.followingCount}</strong> подписок
            </motion.button>
          </motion.div>

          <FollowersModal id={user.userName} />
          <FollowingModal id={user.userName} />
          {user.about && (
            <motion.p className="text-sm mt-2 font-semibold">
              {user.about}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
      <PhotoEdit />
    </>
  );
};

export default HeaderWidget;
