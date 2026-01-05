import GalleryGrid from "../components/gallery/GalleryGrid";
import ImageModal from "../components/gallery/ImageModal";
import ActivityFeed from "../components/feed/ActivityFeed";

export default function Home() {
  return (
    <div className="flex">
      <div className="w-3/4">
        <GalleryGrid />
        <ImageModal />
      </div>

      <div className="w-1/4 bg-white">
        <ActivityFeed />
      </div>
    </div>
  );
}
