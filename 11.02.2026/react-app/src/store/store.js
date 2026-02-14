import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(persist((set) => ({
    posts: [],
    setPosts: (posts) => set({ posts }),
    appendPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
})))