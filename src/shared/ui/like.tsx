"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

export default function Like({ status = false,size="6" }: { status?: boolean,size?:string }) {
  const [like, setLike] = useState(status);
  const handleClick = () => {
    setLike((prev) => !prev);
  };
  return (
    <>
      <div onClick={handleClick} style={{ cursor: "pointer" }}>
        <Heart className={`w-${size} h-${size}`}
          style={{
            fill: like ? "red" : "none",
            stroke: like ? "red" : "black",
            strokeWidth: "2",
          }}
        />
      </div>
    </>
  );
}
