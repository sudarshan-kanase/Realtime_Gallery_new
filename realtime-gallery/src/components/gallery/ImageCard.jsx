import { useUIStore } from "../../store/useUIStore";

export default function ImageCard({ image }) {
  const openImage = useUIStore((state) => state.openImage);

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg"
      onClick={() => openImage(image)}
    >
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className="w-full h-full object-cover hover:scale-105 transition"
      />
    </div>
  );
}

