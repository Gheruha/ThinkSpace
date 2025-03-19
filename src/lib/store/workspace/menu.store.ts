import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MenuState {
	isMenuOpen: boolean;
	toggleMenu: () => void;
	setMenuOpen: (open: boolean) => void;
}

export const useMenuStore = create<MenuState>()(
	persist(
		(set) => ({
			isMenuOpen: true,
			toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
			setMenuOpen: (open: boolean) => set({ isMenuOpen: open })
		}),
		{
			name: 'menu-storage'
		}
	)
);
