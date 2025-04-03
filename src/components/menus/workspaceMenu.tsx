'use client';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LogOutBtn } from '@/components/ui/logout-btn';
import { useMenuStore } from '@/lib/store/workspace/menu.store';
import { useState, useEffect } from 'react';
import WorkspaceHeader from '@/components/headers/workspaceHeader';
import { useWorkspaceStore } from '@/lib/store/workspace/workspace.store';
import { WorkspaceService } from '@/lib/services/workspace/workspace.service';

export default function WorkspaceMenu() {
	const { isMenuOpen, toggleMenu } = useMenuStore();
	const { pages } = useWorkspaceStore((state) => state.pages);
	const { setPages } = useWorkspaceStore((state) => state.setPages);

	const workspaceService = new WorkspaceService();
	useEffect(() => {
		async function fetchAndStorePages() {
			try {
				const data = await workspaceService.getPagesService();
				console.log(data);
			} catch (err: any) {
				console.error('Errir fetching pages: ', err);
			}
		}

		fetchAndStorePages();
	}, [pages, setPages]);

	// menu-side-workspace
	useEffect(() => {
		const sidemenu = document.getElementById('menu-side-workspace') as HTMLElement | null;
		const hideDistance = 240;
		const appearDistance = 20;
		if (sidemenu) {
			const handleMouseMove = (event: MouseEvent) => {
				const cursorX = event.clientX;

				if (!isMenuOpen) {
					if (cursorX < appearDistance) {
						sidemenu.classList.add('pointer-events-auto', 'visible', 'opacity-100');
						sidemenu.classList.remove('hidden', 'opacity-0', 'translate-x[-220]');
					}
					if (cursorX > hideDistance) {
						sidemenu.classList.add(
							'pointer-events-none',
							'hidden',
							'opacity-0',
							'translate-x-[-220]'
						);
						sidemenu.classList.remove('pointer-events-auto', 'visible', 'opacity-100');
					}
				} else {
					sidemenu.classList.add('pointer-events-auto', 'visible', 'opacity-100');
					sidemenu.classList.remove(
						'pointer-events-none',
						'hidden',
						'opacity-0',
						'translate-x-[-220]'
					);
				}
			};

			document.addEventListener('mousemove', handleMouseMove);

			return () => {
				document.removeEventListener('mousemove', handleMouseMove);
			};
		}
	}, [isMenuOpen]);

	return (
		<nav
			id="menu-side"
			className={`flex-grow-0 flex-shrink-0 pointer-events-none relative transition-width duration-200 ease-in-out ${isMenuOpen ? 'w-[240px]' : 'w-0'}`}
		>
			<div className="absolute top-0 left-0 bottom-0 w-0 overflow-visible z-[9] pointer-events-none">
				<div
					id="menu-side-workspace"
					className={`relative w-[240px] transition-[width,opacity,transform] duration-200 ease-in-out bg-secondary dark:bg-slate-900 rounded-r-lg ${isMenuOpen ? 'h-full' : 'h-auto transform translate-y-[59px] translate-z-[0px]'}`}
				>
					<div
						className={`overflow-hidden relative ${isMenuOpen ? 'h-full max-h-full' : 'h-auto max-h-[calc(-118px+100vh)]'}`}
					>
						<div
							className={`flex flex-col ${isMenuOpen ? 'h-full max-h-full' : 'h-auto max-h-[calc(-118px+100vh)]'}`}
						>
							<div className="flex justify-between">
								<LogOutBtn />
								<Button
									variant="icon"
									size="xs"
									onClick={toggleMenu}
									className={`${isMenuOpen ? '' : 'hidden'}`}
								>
									<ChevronsLeft />
								</Button>
							</div>
							<div className="py-4 px-4">
								<div className="flex flex-col h-[80vh] justify-around items-center">
									{/* CONTENT */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
