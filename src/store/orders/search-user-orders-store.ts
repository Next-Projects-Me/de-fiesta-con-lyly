import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    searchUserOrders: {
        take: number;
        searching: string;
        isPaid: string;
        startDate: Date;
        endDate: Date;
    }

    // Methods 
    setSearchUserOrders: (address: State['searchUserOrders']) => void;
}

export const useSearchUserOrdersStore = create<State>()(

    persist(
        (set) => ({
            searchUserOrders: {
                take: 10,
                isPaid: 'all',
                searching: '',
                startDate: new Date(),
                endDate: new Date(),
            },
            setSearchUserOrders: (searchUserOrders) => {
                set({ searchUserOrders });
            }
        }),
        {
            name: 'search-user-orders-storage',
        }
    )
);