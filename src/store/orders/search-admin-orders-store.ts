import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    searchAdminOrders: {
        take: number;
        searching: string;
        isPaid: string;
        startDate: Date;
        endDate: Date;
    }

    // Methods 
    setSearchAdminOrders: (address: State['searchAdminOrders']) => void;
}

export const useSearchAdminOrdersStore = create<State>()(

    persist(
        (set) => ({
            searchAdminOrders: {
                take: 10,
                isPaid: 'all',
                searching: '',
                startDate: new Date(),
                endDate: new Date(),
            },
            setSearchAdminOrders: (searchAdminOrders) => {
                set({ searchAdminOrders });
            }
        }),
        {
            name: 'search-admin-orders-storage',
        }
    )
);