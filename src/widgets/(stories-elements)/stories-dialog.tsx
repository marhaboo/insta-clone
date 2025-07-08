import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/shared/ui/dialog";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

import { SidePreview } from "./story-preview";
import { StoryHeader } from "./story-header";
import { StoryMedia } from "./story-media";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StoryFooter } from "./story-footer";
import { DialogTitle } from "@radix-ui/react-dialog";

export interface Story {
  id: number;
  fileName: string;
  postId: number | null;
  createAt: string;
  liked: boolean;
  likedCount: number;
}

export interface User {
  userId: string;
  userName: string;
  userImage: string | null;
  stories: Story[];
}

export interface StoriesDialogProps {
  users: User[];
  initialUserIndex: number;
  onClose: () => void;
}

export default function StoriesDialog({ users, initialUserIndex, onClose }: StoriesDialogProps) {
  const [currentUserIndex, setCurrentUserIndex] = useState(initialUserIndex);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const mediaRef = useRef<HTMLVideoElement | HTMLImageElement | null>(null);

  const currentUser = users[currentUserIndex];
  const currentStory = currentUser.stories[currentStoryIndex] ?? null;

  useEffect(() => {
    const videoElement = mediaRef.current as HTMLVideoElement | null;
    let timer: NodeJS.Timeout;

    const advanceStory = () => {
      if (currentStoryIndex < currentUser.stories.length - 1) {
        setCurrentStoryIndex(currentStoryIndex + 1);
        setProgress(0);
      } else if (currentUserIndex < users.length - 1) {
        setCurrentUserIndex(currentUserIndex + 1);
        setCurrentStoryIndex(0);
        setProgress(0);
      } else {
        onClose();
      }
    };

    if (!isPaused) {
      if (currentStory && currentStory.fileName?.endsWith(".mp4")) {
        if (videoElement) {
          videoElement.onended = advanceStory;
        }
      } else {
        timer = setInterval(() => {
          setProgress((prevProgress) => {
            if (prevProgress >= 100) {
              advanceStory();
              return 0;
            }
            return prevProgress + 1;
          });
        }, 30);
      }
    }

    return () => {
      if (timer) clearInterval(timer);
      const currentMedia = mediaRef.current;
      if (currentMedia && "onended" in currentMedia) {
        (currentMedia as HTMLVideoElement).onended = null;
      }
    };
  }, [
    currentStoryIndex,
    currentUserIndex,
    currentUser.stories.length,
    users.length,
    onClose,
    currentStory?.fileName,
    isPaused,
  ]);

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    } else if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
      setCurrentStoryIndex(users[currentUserIndex - 1].stories.length - 1);
      setProgress(0);
    }
  };

  const handleNextStory = () => {
    if (currentStoryIndex < currentUser.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    } else if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
      setCurrentStoryIndex(0);
      setProgress(0);
    } else {
      onClose();
    }
  };


  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-[1900px] mx-auto p-0 h-[100dvh] border-none overflow-hidden bg- md:h-screen md:max-h-[90vh] md:my-auto">
        <DialogTitle></DialogTitle>
        <div className="relative h-full flex items-center">
          <AnimatePresence>
            <div className="hidden w-[400px] md:flex sm:hidden flex-col h-3/4 only-one justify-center space-y-3 pl-2">
              {users
                .slice(0, currentUserIndex)
                .reverse()
                .slice(0, 1)
                .map((user, index) => (
                  <SidePreview
                    key={user.userId}
                    user={user}
                    index={currentUserIndex - index - 1}
                    isNext={false}
                    onClick={() => {
                      setCurrentUserIndex(index);
                      setCurrentStoryIndex(0);
                      setProgress(0);
                    }}
                  />
                ))}
            </div>
          </AnimatePresence>

          <div className="flex-grow h-[100vh] relative max-w-[500px] mx-auto">
            <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-2">
              {currentUser.stories.map((_, index) => (
                <div key={index} className="flex-1 h-0.5 bg-white/30">
                  <motion.div
                    className="h-full bg-white"
                    initial={{ width: "0%" }}
                    animate={{
                      width:
                        index === currentStoryIndex
                          ? `${progress}%`
                          : index < currentStoryIndex
                            ? "100%"
                            : "0%",
                    }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                </div>
              ))}
            </div>

            <StoryHeader
              user={currentUser}
              story={currentStory}
              isMuted={isMuted}
              setIsMuted={setIsMuted}
            />

            <StoryMedia fileName={currentStory?.fileName} isMuted={isMuted} />

            <button
              onClick={handlePrevStory}
              className="absolute left-4 top-[40%] -translate-y-1/2 z-30 text-white/50 hover:text-white transition-colors"
              disabled={currentUserIndex === 0 && currentStoryIndex === 0}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextStory}
              className="absolute right-4 top-[40%] -translate-y-1/2 z-30 text-white/50 hover:text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute inset-0 z-10 flex">
              <div
                className="w-1/2 h-full"
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
                onMouseDown={() => setIsPaused(true)}
                onMouseUp={() => setIsPaused(false)}
                onMouseLeave={() => setIsPaused(false)}
                onClick={handlePrevStory}
              />
              <div
                className="w-1/2 h-1/2"
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
                onMouseDown={() => setIsPaused(true)}
                onMouseUp={() => setIsPaused(false)}
                onMouseLeave={() => setIsPaused(false)}
                onClick={handleNextStory}
              />
            </div>

            <StoryFooter
              userName={currentUser}
              onReplyClick={() => { }}
              liked={currentStory?.liked}
              id={currentStory?.id}
              onLikeClick={() => { }}
            />
          </div>

          <AnimatePresence>
            <div className="hidden w-[400px] md:flex flex-col lg:h-3/4 only-one sm:hidden justify-center space-y-2 pr-2">
              {users
                .slice(currentUserIndex + 1, currentUserIndex + 2)
                .map((user, index) => (
                  <SidePreview
                    key={user?.userId}
                    user={user}
                    index={currentUserIndex + index + 1}
                    isNext={true}
                    onClick={() => {
                      setCurrentUserIndex(currentUserIndex + index + 1);
                      setCurrentStoryIndex(0);
                      setProgress(0);
                    }}
                  />
                ))}
            </div>
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
