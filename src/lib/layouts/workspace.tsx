'use client';

import { useState, useEffect } from 'react';
import WorkspaceMenu from '@/components/menus/workspaceMenu';
import WorkspaceHeader from '@/components/headers/workspaceHeader';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);

	function toggleMenu() {
		setIsMenuOpen(!isMenuOpen);
	}

	// menu-side
	useEffect(() => {
		const sidebar = document.getElementById('menu-side') as HTMLElement | null;
		const hideDistance = 240;

		if (sidebar) {
			const handleMouseMove = (event: MouseEvent) => {
				const cursorX = event.clientX;

				if (!isMenuOpen) {
					if (cursorX < hideDistance) {
						sidebar.setAttribute('aria-hidden', 'true');
					} else {
						sidebar.setAttribute('aria-hidden', 'false');
					}
				} else {
					sidebar.setAttribute('aria-hidden', 'false');
				}
			};

			document.addEventListener('mousemove', handleMouseMove);

			return () => {
				document.removeEventListener('mousemove', handleMouseMove);
			};
		}
	}, [isMenuOpen]);

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
						sidemenu.classList.add('pointer-events-auto');
						sidemenu.classList.add('visible');
						sidemenu.classList.add('opacity-100');
						sidemenu.classList.remove('pointer-events-none');
						sidemenu.classList.remove('hidden');
						sidemenu.classList.remove('opacity-0');
						sidemenu.classList.remove('translate-x-[-220]');
					}
					if (cursorX > hideDistance) {
						sidemenu.classList.add('pointer-events-none');
						sidemenu.classList.add('hidden');
						sidemenu.classList.add('opacity-0');
						sidemenu.classList.add('translate-x-[-220]');
						sidemenu.classList.remove('pointer-events-auto');
						sidemenu.classList.remove('visible');
						sidemenu.classList.remove('opacity-100');
					}
				} else {
					sidemenu.classList.add('pointer-events-auto');
					sidemenu.classList.add('visible');
					sidemenu.classList.add('opacity-100');
					sidemenu.classList.remove('pointer-events-none');
					sidemenu.classList.remove('hidden');
					sidemenu.classList.remove('opacity-0');
					sidemenu.classList.remove('translate-x-[-220]');
				}
			};

			document.addEventListener('mousemove', handleMouseMove);

			return () => {
				document.removeEventListener('mousemove', handleMouseMove);
			};
		}
	}, [isMenuOpen]);

	return (
		<div className="flex fixed min-h-screen w-full">
			<WorkspaceMenu />
			<div className="flex flex-col min-h-screen flex-grow">
				<WorkspaceHeader />
				<main className="p-4">{children}</main>
			</div>
		</div>
	);
}
