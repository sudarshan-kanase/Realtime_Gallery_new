import { create } from "zustand";

export const useUIStore = create((set) => ({
  selectedImage: null,
  openImage: (image) => set({ selectedImage: image }),
  closeImage: () => set({ selectedImage: null }),
}));
