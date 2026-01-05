import axios from "axios";

const UNSPLASH_URL = "https://api.unsplash.com/photos";

export const fetchImages = async ({ pageParam = 1 }) => {
  const response = await axios.get(UNSPLASH_URL, {
    params: {
      page: pageParam,
      per_page: 12,
    },
    headers: {
      Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`,
    },
  });

  return response.data;
};
