import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchImages } from "../../api/unsplash";
import ImageCard from "./ImageCard";

export default function GalleryGrid() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
    getNextPageParam: (_, pages) => pages.length + 1,
  });

  if (isLoading) return <p>Loading images...</p>;
  if (isError) return <p>Failed to load images</p>;

  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-4">
        {data.pages.map((page) =>
          page.map((img) => (
            <ImageCard key={img.id} image={img} />
          ))
        )}
      </div>

      {hasNextPage && (
        <div className="text-center mb-4">
          <button
            onClick={fetchNextPage}
            disabled={isFetchingNextPage}
            className="px-4 py-2 bg-black text-white rounded"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}
