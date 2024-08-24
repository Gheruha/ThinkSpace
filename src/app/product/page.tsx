'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Product() {
	return (
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
	);
}
