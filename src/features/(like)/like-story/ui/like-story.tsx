import { AppDispatch } from "@/app/store/store";
import { likeApiStory } from "@/entities/(like)/like-story/api/like-api-story";
import Like from "@/shared/ui/like";
import { useDispatch } from "react-redux";

export default function StoryLike({
  id,
  status,
}: {
  id?: number;
  status?: boolean;
}) {
  const dispatch=useDispatch<AppDispatch>()
  
  return (
    <>
      <div onClick={() => dispatch(likeApiStory(id))}>
        <Like status={status} />
      </div>
    </>
  );
}
