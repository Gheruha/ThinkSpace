'use client';

import { ThemeImage } from '@/app/product/components/themeImage';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/theme-toggler';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useButtonContext } from '@/app/product/components/clickedButton';
import Link from 'next/link';

export default function LearningProductLayout({ children }: { children: React.ReactNode }) {
	const [about, setAbout] = useState(false);
	const [download, setDownload] = useState(false);
	const { setClickedButton } = useButtonContext();

	const handleClick = (button: string) => {
		setClickedButton(button);
	};

	function isAbout() {
		setAbout(!about);
	}

	function isDownload() {
		setDownload(!download);
	}

	return (
		<div className="items-center">
			<div className="flex flex-col min-h-screen">
				{/* Header */}
				<header className="h-16 p-4">
					<div className="flex space-x-3">
						<Link href="/product" passHref className="flex items-center space-x-4 min-w-[10.25rem]">
							<ThemeImage
								lightSrc="icons/light_mode/favicon.png"
								darkSrc="icons/dark_mode/favicon.png"
								alt="icon"
								className="w-8 h-8"
							/>
							<span className="text-xl font-medium w-36">Think Space</span>
						</Link>
						<nav className="flex justify-between w-full">
							<div className="flex">
								<Button variant="ghost" size="xs" onClick={isAbout}>
									<span className="text-lg font-normal">About</span>
									{about === false ? (
										<ChevronDown size={20} strokeWidth={2.5} absoluteStrokeWidth className="pl-1" />
									) : (
										<ChevronUp size={20} strokeWidth={2.5} absoluteStrokeWidth className="pl-1" />
									)}
								</Button>
								<Button variant="ghost" size="xs" onClick={isDownload}>
									<span className="text-lg font-normal">Resources</span>
									{download === false ? (
										<ChevronDown size={20} strokeWidth={2.5} absoluteStrokeWidth className="pl-1" />
									) : (
										<ChevronUp size={20} strokeWidth={2.5} absoluteStrokeWidth className="pl-1" />
									)}
								</Button>
								<Link href="/pricing" passHref>
									<Button variant="ghost" size="xs">
										<span className="text-lg font-normal">Pricing</span>
									</Button>
								</Link>
							</div>
							<div className="flex space-x-3">
								<ModeToggle />
								<Link href="/auth" passHref>
									<Button variant="ghost" size="xs" onClick={() => handleClick('Log In')}>
										<span className="text-lg font-normal">Log in</span>
									</Button>
								</Link>
								<Link href="/auth" passHref>
									<Button size="xs" className="rounded-sm" onClick={() => handleClick('Sign Up')}>
										<span className="text-lg font-normal">Sign up</span>
									</Button>
								</Link>
							</div>
						</nav>
					</div>
				</header>
				<main className="flex pt-20 px-8 justify-center">{children}</main>
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
		</div>
	);
}