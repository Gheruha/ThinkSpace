'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion';
import { AboutFeatures } from './aboutFeatures';
import { ResourcesFeatures } from './resourcesFeatures';

export const SmallMenu = ({ menuOpen }: any) =>
	menuOpen && (
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
							<AccordionContent>
								<AboutFeatures />
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger>Resources</AccordionTrigger>
							<AccordionContent>
								<ResourcesFeatures />
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3">
							<Link href="/pricing" legacyBehavior passHref>
								<button className="flex flex-1 w-full items-center justify-between py-4 font-medium transition-all">
									<span className="font-medium">Pricing</span>
								</button>
							</Link>
						</AccordionItem>
					</Accordion>
					<div className="flex flex-col space-y-3 py-4 border-t">
						<Link href="/auth" passHref>
							<Button size="xs" className="w-full">
								Sign up
							</Button>
						</Link>
						<Link href="/auth" passHref>
							<Button variant="outline" size="xs" className="w-full">
								Sign in
							</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</nav>
	);
