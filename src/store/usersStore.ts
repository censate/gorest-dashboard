import { create } from "zustand";
import type { User, PaginationMeta } from "../types";
import { api } from "../api";

interface UsersState {
  users: User[];
  pagination: PaginationMeta;
  perPage: number;
  loading: boolean;
  error: string | null;
  setPerPage: (perPage: number) => void;
  fetchUsers: (page: number) => Promise<void>;
}

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  pagination: { page: 1, per_page: 10, total: 0, pages: 1 },
  perPage: 10,
  loading: false,
  error: null,

  setPerPage: (perPage: number) => {
    set({ perPage });
    get().fetchUsers(1);
  },

  fetchUsers: async (page: number) => {
    const { perPage } = get();
    set({ loading: true, error: null });
    try {
      const response = await api.getUsers(page, perPage);
      set({
        users: response.data,
        pagination: response.pagination,
        loading: false,
      });
    } catch {
      set({ error: "Ошибка загрузки пользователей", loading: false });
    }
  },
}));
