import { AppDispatch } from "@/app/store/store";
import { likeApiPost } from "@/entities/(like)/like-post/api/like-api-post";
import Like from "@/shared/ui/like";
import { useDispatch } from "react-redux";

export default function PostLike({
  id,
  status,
}: {
  id?: number;
  status?: boolean;
}) {
  const dispatch=useDispatch<AppDispatch>()
  
  return (
    <>
      <div onClick={() => dispatch(likeApiPost(id))}>
        <Like status={status} />
      </div>
    </>
  );
}
