import GalleryGrid from "../components/gallery/GalleryGrid";
import ImageModal from "../components/gallery/ImageModal";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <GalleryGrid />
      <ImageModal />
    </div>
  );
}
