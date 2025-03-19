import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import type { AppDispatch, RootState } from "@/app/store/store";
import { setFollowersModal } from "@/entities/profile/my-profile/reducers/profile-slice";
import {
  getFollowingRelationShip,
  getProfileId,
} from "@/entities/profile/my-profile/api/api";
import defaultImg from "@/app/assets/images/profile/default-profile.svg";
import { SearchFollowings } from "@/features/profile/search-followings/search-followings"; // ✅ Используем фичу поиска
import { FollowButton } from "@/features/follow-button/follow-button"; // ✅ Используем фичу кнопки подписки

interface FollowingShortInfo {
  userId: string;
  userName: string;
  userPhoto: string;
  fullname: string;
}

export interface UserFollowing {
  id: number;
  userShortInfo: FollowingShortInfo;
  isFollowing: boolean; // ✅ Убедись, что это свойство есть в API
}

export function FollowersModal({ id }: { id: string }) {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { followersModal, followings, userId } = useSelector(
    (state: RootState) => state.myProfile
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getProfileId(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (userId) {
      dispatch(getFollowingRelationShip(userId));
    }
  }, [dispatch, userId]);

  if (!followersModal) return null;

  const baseImageUrl = "https://instagram-api.softclub.tj/images/";
  const filteredFollowings = followings.filter((following: UserFollowing) =>
    [
      following.userShortInfo.userName.toLowerCase(),
      following.userShortInfo.fullname.toLowerCase(),
    ].some((text) => text.includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-50"
        onClick={() => dispatch(setFollowersModal(false))}
      />

      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[400px] w-full bg-white dark:bg-[#262626] rounded-xl shadow-xl z-50 overflow-hidden">
        <div className="relative py-2 px-4 text-center border-b border-[#DBDBDB] dark:border-[#363636]">
          <h2 className="text-[16px] leading-5 font-semibold text-[#262626] dark:text-white font-['Helvetica']">
            Подписки
          </h2>
          <button
            onClick={() => dispatch(setFollowersModal(false))}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-[#F8F8F8] dark:hover:bg-[#363636] dark:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <SearchFollowings onSearch={setSearchQuery} />

        <div className="max-h-[356px] overflow-y-auto">
          {filteredFollowings.map((following: UserFollowing) => {
            const profileImage = following.userShortInfo.userPhoto
              ? `${baseImageUrl}${following.userShortInfo.userPhoto}`
              : defaultImg;

            return (
              <div
                key={following.userShortInfo.userId}
                className="flex items-center justify-between py-2 px-4 hover:bg-[#FAFAFA] dark:hover:bg-[#363636] transition-colors"
              >
                <div
                  className="flex items-center gap-3"
                  onClick={() => {
                    router.push(`/profile/${following.userShortInfo.userId}`);
                    dispatch(setFollowersModal(false));
                  }}
                >
                  <div className="relative h-[44px] w-[44px] rounded-full overflow-hidden">
                    <Image
                      src={profileImage}
                      alt={following.userShortInfo.userName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#262626] dark:text-white leading-[18px] font-['Helvetica']">
                      {following.userShortInfo.userName}
                    </span>
                    <span className="text-sm text-[#8E8E8E] leading-[18px] font-['Helvetica']">
                      {following.userShortInfo.fullname}
                    </span>
                  </div>
                </div>

                <FollowButton
                  userId={following.userShortInfo.userId}
                  isFollowing={following.isFollowing}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
