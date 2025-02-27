import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WorkspaceState {
	pages: any[];
	setPages: (pages: any[]) => void;
	refreshPages: () => Promise<void>;
	pagesCount: number;
	setPagesCount: (count: number) => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
	persist(
		(set) => ({
			pages: [],
			pagesCount: 0,
			setPages: (pages: any[]) => set(() => ({ pages, pagesCount: pages.length })),
			setPagesCount: (count: number) => set(() => ({ pagesCount: count })),
			refreshPages: async () => {}
		}),
		{
			name: 'workspace-storage'
		}
	)
);
