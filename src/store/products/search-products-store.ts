import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    searchProducts: {
        take: number;
        subcategory: number;
        searching: string;
    }

    // Methods 
    setProductSearch: (address: State['searchProducts']) => void;
}

export const useSearchProductStore = create<State>()(

    persist(
        (set) => ({
            searchProducts: {
                take: 10,
                subcategory: 0,
                searching: ''
            },
            setProductSearch: (searchProducts) => {
                set({ searchProducts });
            }
        }),
        {
            name: 'search-product-storage',
        }
    )
);