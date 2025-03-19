import { Grid, Bookmark, Film } from "lucide-react";
import PostsTab from "@/features/profile/posts-tab/posts-tab";
import SavedTab from "@/features/profile/saved-tab/saved-tab";
import ReelsTab from "@/features/profile/reels-tab/reels-tab";

const TabsWidget = ({ tab, setTab, myProfileData }: any) => {
  return (
    <div>
      <div className="border-t">
        <div className="flex justify-center -mb-px">
          <button
            className={`flex items-center gap-2 px-6 py-3 text-xs font-medium ${
              tab === "posts" ? "border-t border-black text-black" : "text-gray-500"
            }`}
            onClick={() => setTab("posts")}
          >
            <Grid className="w-3 h-3" />
            POSTS
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-3 text-xs font-medium ${
              tab === "saved" ? "border-t border-black text-black" : "text-gray-500"
            }`}
            onClick={() => setTab("saved")}
          >
            <Bookmark className="w-3 h-3" />
            SAVED
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-3 text-xs font-medium ${
              tab === "reels" ? "border-t border-black text-black" : "text-gray-500"
            }`}
            onClick={() => setTab("reels")}
          >
            <Film className="w-3 h-3" />
            REELS
          </button>
        </div>
      </div>

      <div className="mt-4">
        {tab === "posts" && <PostsTab posts={myProfileData} />}
        {tab === "saved" && <SavedTab />}
        {tab === "reels" && <ReelsTab posts={myProfileData} />}
      </div>
    </div>
  );
};

export default TabsWidget;
