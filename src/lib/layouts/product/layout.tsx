'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ThemeImage } from '@/app/product/components/themeImage';
import { ModeToggle } from '@/components/theme-toggler';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion';

export default function LearningProductLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	const [menuOpen, setMenuOpen] = useState(false);
	const [showBorder, setShowBorder] = useState(false);

	const goToSignUp = (e: React.MouseEvent<HTMLAnchorElement>): void => {
		e.preventDefault();
		router.push('/auth?mode=signUp');
	};

	const goToSignIn = (e: React.MouseEvent<HTMLAnchorElement>): void => {
		e.preventDefault();
		router.push('/auth?mode=signIn');
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 64) {
				setShowBorder(true);
			} else {
				setShowBorder(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 1024) {
				setMenuOpen(false);
			}
		};

		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [menuOpen]);

	return (
		<div className="flex flex-col min-h-screen">
			{/* Header */}
			<div
				className="top-0 sticky block z-40"
				style={{ backgroundColor: 'hsl(var(--background))' }}
			>
				<header className="h-16 px-4">
					<div
						className={`flex space-x-3 py-4 transition-all duration-100 ${showBorder ? 'border-b' : ''}`}
					>
						<Link href="/product" passHref className="flex space-x-4 min-w-[10.25rem]">
							<ThemeImage
								lightSrc="icons/light_mode/favicon.png"
								darkSrc="icons/dark_mode/favicon.png"
								alt="icon"
								className="w-8 h-8"
							/>
							<span className="text-xl font-medium w-36">Think Space</span>
						</Link>
						<nav className="flex justify-between w-full h-6">
							<div className="hidden lg:flex">
								<NavigationMenu>
									<NavigationMenuList>
										<NavigationMenuItem>
											<NavigationMenuTrigger>About</NavigationMenuTrigger>
											<NavigationMenuContent>
												<div className="py-16 px-28">
													<div className="flex items-center">
														<p className="text-4xl border-2 text-blue-900 border-blue-800 rounded-3xl p-4 dark:text-blue-400 dark:border-blue-400 whitespace-nowrap">
															Coming soon
														</p>
													</div>
												</div>
											</NavigationMenuContent>
										</NavigationMenuItem>
										<NavigationMenuItem>
											<NavigationMenuTrigger>Resources</NavigationMenuTrigger>
											<NavigationMenuContent>
												<div className="py-16 px-28">
													<div className="flex items-center">
														<p className="text-4xl border-2 text-blue-900 border-blue-800 rounded-3xl p-4 dark:text-blue-400 dark:border-blue-400 whitespace-nowrap">
															Coming soon
														</p>
													</div>
												</div>
											</NavigationMenuContent>
										</NavigationMenuItem>
										<NavigationMenuItem>
											<Link href="/pricing" legacyBehavior passHref>
												<NavigationMenuLink className={navigationMenuTriggerStyle()}>
													<span className="text-lg font-normal">Pricing</span>
												</NavigationMenuLink>
											</Link>
										</NavigationMenuItem>
									</NavigationMenuList>
								</NavigationMenu>
							</div>
							<div className="hidden lg:flex space-x-3">
								<ModeToggle />
								<Link href="/auth" onClick={goToSignIn} passHref>
									<Button variant="ghost" size="xs">
										<span className="text-lg font-normal">Sign in</span>
									</Button>
								</Link>
								<Link href="/auth" onClick={goToSignUp} passHref>
									<Button size="xs" className="rounded-sm">
										<span className="text-lg font-normal">Sign up</span>
									</Button>
								</Link>
							</div>
							<div className="lg:hidden flex justify-end w-full space-x-3">
								<ModeToggle />
								<Button variant="ghost" size="xs" onClick={() => setMenuOpen(!menuOpen)}>
									<Menu />
								</Button>
							</div>
						</nav>
					</div>
				</header>
				{menuOpen && (
					<nav className="fixed top-16 left-0 w-full h-[calc(100%-4rem)] z-50">
						<Card className="h-full border-0">
							<CardContent className="h-full px-4">
								<Accordion
									type="single"
									collapsible
									className="w-full h-[calc(100vh-10.75rem)] overflow-y-auto"
								>
									<AccordionItem value="item-1">
										<AccordionTrigger>About</AccordionTrigger>
										<AccordionContent>About features</AccordionContent>
									</AccordionItem>
									<AccordionItem value="item-2">
										<AccordionTrigger>Resources</AccordionTrigger>
										<AccordionContent>Resources features</AccordionContent>
									</AccordionItem>
									<AccordionItem value="item-3">
										<Link href="/pricing" legacyBehavior passHref>
											<button className="flex flex-1 w-full items-center justify-between py-4 font-medium transition-all">
												<span className=" font-medium">Pricing</span>
											</button>
										</Link>
									</AccordionItem>
								</Accordion>
								<div
									className="flex flex-col space-y-3 py-4 border-t"
									style={{ backgroundColor: 'hsl(var(--background))' }}
								>
									<Link href="/auth" onClick={goToSignUp} passHref>
										<Button size="xs" className="w-full">
											<span className="text-lg font-normal">Sign up</span>
										</Button>
									</Link>
									<Link href="/auth" onClick={goToSignIn} passHref>
										<Button variant="outline" size="xs" className="w-full">
											<span className="text-lg font-normal">Sign in</span>
										</Button>
									</Link>
								</div>
							</CardContent>
						</Card>
					</nav>
				)}
			</div>
			<main className="flex pt-20 px-8 justify-center z-30">{children}</main>
			{/* Footer */}
			<footer className="pt-16 pb-10 px-4 mt-auto">
				<div className="flex justify-center items-center space-x-2">
					<Button
						variant="icon"
						size="icon"
						onClick={() => window.open('https://github.com/Gheruha/ThinkSpace', '_blank')}
					>
						<ThemeImage
							lightSrc="icons/light_mode/github_logo.png"
							darkSrc="icons/dark_mode/github_logo.png"
							alt="icon"
							className="w-8 h-8"
						/>
					</Button>
					<span className="opacity-70 pt-1">© 2024 Think Space</span>
				</div>
			</footer>
		</div>
	);
}
