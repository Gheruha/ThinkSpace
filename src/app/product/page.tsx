'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/theme-toggler';
import { ChevronUp, ChevronDown, ArrowRight } from 'lucide-react';
import { ThemeImage } from './components/themeImage';

export default function Home() {
	const [about, setAbout] = useState(false);
	const [download, setDownload] = useState(false);

	function isAbout() {
		setAbout(!about);
	}

	function isDownload() {
		setDownload(!download);
	}

	return (
		<div className="flex flex-col min-h-screen">
			{/* Header */}
			<header className="h-16 p-4">
				<div className="flex space-x-3">
					<a className="flex items-center space-x-4 min-w-[10.25rem]" href="/example">
						<ThemeImage
							lightSrc="icons/light_mode/favicon.png"
							darkSrc="icons/dark_mode/favicon.png"
							alt="icon"
							className="w-8 h-8"
						/>
						<span className="text-xl font-medium w-36">Think Space</span>
					</a>
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
							<Button variant="ghost" size="xs">
								<span className="text-lg font-normal">Pricing</span>
							</Button>
						</div>
						<div className="flex space-x-3">
							<ModeToggle />
							<Button variant="ghost" size="xs">
								<span className="text-lg font-normal">Log in</span>
							</Button>
							<Button size="xs" className="rounded-sm">
								<span className="text-lg font-normal">Sign up</span>
							</Button>
						</div>
					</nav>
				</div>
			</header>
			{/* Content */}
			<main className="flex pt-20 px-8 justify-center">
				<div className="hero-page">
					<p className="hero-text">
						Organize your <span className="text-violet-700">Life</span>
					</p>
					<p className="text-gray-800 dark:text-gray-200 max-w-[40rem] simple-text">
						All in one single place, use all the templates available or create one by yourself.
					</p>
					<Button className="flex space-x-1 get-started">
						<span>Get Started</span>
						<ArrowRight size={20} strokeWidth={3} />
					</Button>
				</div>
			</main>
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
