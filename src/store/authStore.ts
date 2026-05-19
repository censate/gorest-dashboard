import { create } from "zustand";

interface AuthState {
  token: string;
  setToken: (token: string) => void;
  isValid: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: "",
  setToken: (token: string) => set({ token }),
  isValid: () => {
    const token = get().token;
    return token.trim().length > 0;
  },
}));
