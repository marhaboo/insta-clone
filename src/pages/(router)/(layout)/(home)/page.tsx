import UserProfile from "@/features/user-profile/user-profile";
import Post from "@/widgets/post/post";
import ReccomendBlock from "@/widgets/recommend-block/recommend-block";
import Stories from "@/widgets/stories/stories";



export default function Home() {
  return <>
 <div className="min-h-screen dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          <main className="flex-1 ">
              <Stories />
              <div className="mt-5 flex flex-col gap-2">
                <Post/>
              </div>
          </main>

          <aside className="lg:w-80 mt-6 lg:mt-0">
            <div className="top-8 space-y-6 sm:hidden lg:block">
            <UserProfile/>
              <div>
                <h2 className="text-lg font-semibold mb-4">Recommendations</h2>
                <ReccomendBlock/>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </>
    
}

