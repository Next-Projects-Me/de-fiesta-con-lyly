import { create } from 'zustand';

interface State {

    isLeftSideMenuOpen: boolean;
    openLeftSideMenu: () => void;
    closeLeftSideMenu: () => void;

    isSideMenuOpen: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;

    isNavMenuOpen: boolean;
    openNavMenu: () => void;
    closeNavMenu: () => void;

    isModalLoginOpen: boolean;
    openModalLogin: () => void;
    closeModalLogin: () => void;

    closeAllMenus: () => void;
}

export const useUiStore = create<State>()((set) => ({

    isLeftSideMenuOpen: false,
    openLeftSideMenu: () => set({ isLeftSideMenuOpen: true }),
    closeLeftSideMenu: () => set({ isLeftSideMenuOpen: false }),

    isSideMenuOpen: false,
    openSideMenu: () => set({ isSideMenuOpen: true }),
    closeSideMenu: () => set({ isSideMenuOpen: false }),

    isNavMenuOpen: false,
    openNavMenu: () => set({ isNavMenuOpen: true }),
    closeNavMenu: () => set({ isNavMenuOpen: false }),

    isModalLoginOpen: false,
    openModalLogin: () => set({ isModalLoginOpen: true }),
    closeModalLogin: () => set({ isModalLoginOpen: false }),

    closeAllMenus: () => set({
        isModalLoginOpen: false,
        isNavMenuOpen: false
    }),

}));
