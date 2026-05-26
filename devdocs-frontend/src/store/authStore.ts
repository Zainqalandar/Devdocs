"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";
import { api } from "@/api/client";

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        api.setToken(token);
        set({ user, token, isAuthenticated: true });
      },
      clearAuth: () => {
        api.setToken(null);
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "devdocs_auth",
      onRehydrateStorage: () => (state) => {
        if (state?.token) api.setToken(state.token);
      },
    }
  )
);
