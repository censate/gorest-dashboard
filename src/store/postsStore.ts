import { create } from "zustand";
import type { Post, PaginationMeta } from "../types";
import { api } from "../api";

interface PostsState {
  posts: Post[];
  pagination: PaginationMeta;
  perPage: number;
  loading: boolean;
  error: string | null;
  setPerPage: (perPage: number) => void;
  fetchPosts: (page: number) => Promise<void>;
}

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: [],
  pagination: { page: 1, per_page: 10, total: 0, pages: 1 },
  perPage: 10,
  loading: false,
  error: null,

  setPerPage: (perPage: number) => {
    set({ perPage });
    get().fetchPosts(1);
  },

  fetchPosts: async (page: number) => {
    const { perPage } = get();
    set({ loading: true, error: null });
    try {
      const response = await api.getPosts(page, perPage);
      set({
        posts: response.data,
        pagination: response.pagination,
        loading: false,
      });
    } catch {
      set({ error: "Ошибка загрузки постов", loading: false });
    }
  },
}));
