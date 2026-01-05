import { useUIStore } from "../../store/useUIStore";
import EmojiBar from "../interactions/EmojiBar";
import CommentBox from "../interactions/CommentBox";

export default function ImageModal() {
  const selectedImage = useUIStore((s) => s.selectedImage);
  const closeImage = useUIStore((s) => s.closeImage);

  if (!selectedImage) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-3xl rounded-lg p-4 relative">
        <button
          onClick={closeImage}
          className="absolute top-2 right-2 font-bold text-xl"
        >
          ✕
        </button>

        <img
          src={selectedImage.urls.regular}
          alt=""
          className="rounded w-full"
        />

        <EmojiBar imageId={selectedImage.id} />
        <CommentBox imageId={selectedImage.id} />
      </div>
    </div>
  );
}
