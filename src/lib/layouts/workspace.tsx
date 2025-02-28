'use client';

import { useState, useEffect } from 'react';
import { Ellipsis } from 'lucide-react';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LogOutBtn } from '@/components/ui/logout-btn';

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
			<div className="flex flex-col min-h-screen flex-grow">
				<header className={`flex h-8 w-full ${isMenuOpen ? 'justify-end' : 'justify-between'}`}>
					<Button
						variant="icon"
						size="xs"
						className={`px-2 ${isMenuOpen ? 'hidden' : ''}`}
						onClick={toggleMenu}
					>
						<ChevronsRight />
					</Button>
					<Button variant="icon" size="xs" className="px-2">
						<Ellipsis />
					</Button>
				</header>
				<main className="p-4">{children}</main>
			</div>
		</div>
	);
}
