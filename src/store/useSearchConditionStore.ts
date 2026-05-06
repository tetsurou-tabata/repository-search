import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/*
検索クエリストア
*/
interface SearchConditionStore {
    query: string;
    setQuery: (newQuery: string) => void;
}

export const useSearchConditionStore = create<SearchConditionStore>()(
    persist(
        (set) => ({
            query: "",
            setQuery: (newQuery: string) => set({ query: newQuery }),
        }),
        {
            name: "search-condition-store",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ query: state.query }),
        },
    ),
);
