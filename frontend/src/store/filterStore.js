import { create } from "zustand";

export const useFilterStore = create((set) => ({
  sort: "popular",
  year: "",
  minRating: 0,
  maxRating: 10,
  genres: [],

  setFilters: (filters) => set((state) => ({ ...state, ...filters })),

  resetFilters: () =>
    set({
      sort: "popular",
      year: "",
      minRating: 0,
      maxRating: 10,
      genres: [],
    }),
}));
