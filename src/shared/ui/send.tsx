import { Send } from "lucide-react";

export default function SendIcon({ size = "6" }: { size?: string }) {
  return (
    <>
      <Send className={`w-${size} h-${size} `} />
    </>
  );
}

