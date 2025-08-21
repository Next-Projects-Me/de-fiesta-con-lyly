import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    address: {
        firstName: string;
        lastName: string;
        address: string;
        address2?: string;
        department: string;
        departmentId: number;
        city: string;
        cityId: number;
        phone: string;
        document: string;
    }

    // Methods 
    setAddress: (address: State['address']) => void;
}


export const useAddressStore = create<State>()(

    persist(
        (set) => ({
            address: {
                firstName: '',
                lastName: '',
                address: '',
                address2: '',
                department: '',
                departmentId: 0,
                city: '',
                cityId: 0,
                phone: '',
                document: '',
            },
            setAddress: (address) => {
                set({ address });
            }
        }),
        {
            name: 'address-storage',
        }
    )
);