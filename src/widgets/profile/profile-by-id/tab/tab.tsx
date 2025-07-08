import { Grid, Film, Tag } from "lucide-react";
import PostsTab from "@/features/profile/posts-tab/posts-tab";
import ReelsTab from "@/features/profile/reels-tab/reels-tab";

type TabsWidgetProps = {
  tab: string;
  setTab: (tab: string) => void;
  myProfileData: unknown;
};

const TabsWidget = ({ tab, setTab, myProfileData }: TabsWidgetProps) => {
  return (
    <div>
      <div className="border-t">
        <div className="flex justify-center -mb-px">
          <button
            className={`flex items-center gap-2 px-6 py-3 text-xs font-medium ${
              tab === "posts"
                ? "border-t-2 border-black text-black"
                : "text-gray-500"
            }`}
            onClick={() => setTab("posts")}
          >
            <Grid className="w-3 h-3" />
            POSTS
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-3 text-xs font-medium ${
              tab === "saved"
                ? "border-t-2 border-black text-black"
                : "text-gray-500"
            }`}
            onClick={() => setTab("saved")}
          >
            <Tag className="w-3 h-3" />
            Tags
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-3 text-xs font-medium ${
              tab === "reels"
                ? "border-t-2 border-black text-black"
                : "text-gray-500"
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
        {tab === "reels" && <ReelsTab posts={myProfileData} />}
      </div>
    </div>
  );
};

export default TabsWidget;
