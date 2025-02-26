'use client';

import { useState } from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function Pricing() {
	const [isMonthly, setIsMonthly] = useState(true);

	return (
		<div className="flex flex-col items-center">
			<p className="hidden lg:block text-6xl font-semibold">Your personal toolkit.</p>
			<p className="hidden lg:block text-5xl font-semibold">Start free and empower your journey.</p>
			<p className="lg:hidden text-6xl font-semibold">Pricing</p>
			<Tabs defaultValue="monthly" className="pricing-tab">
				<TabsList className="grid w-full grid-cols-2 rounded-3xl">
					<TabsTrigger
						value="monthly"
						className="rounded-3xl h-full"
						onClick={() => {
							setIsMonthly(true);
						}}
					>
						Pay monthly
					</TabsTrigger>
					<TabsTrigger
						value="yearly"
						className="flex flex-wrap rounded-3xl space-x-1.5"
						onClick={() => {
							setIsMonthly(false);
						}}
					>
						<span>Pay yearly</span>
						<span className="text-xs font-normal text-primary">save 30%</span>
					</TabsTrigger>
				</TabsList>
			</Tabs>
			<div className="grid grid-cols-12 auto-rows-min gap-x-6 w-full">
				<div className="pricing-plans-grid">
					<Card className="flex flex-col flex-grow self-end h-full p-[28px_32px_24px]">
						<Label>Free</Label>
						<CardTitle className="pb-6 pt-2">$0</CardTitle>
						<Button variant="outline">Get started</Button>
						<ul
							className="pt-4 pl-4 text-gray-700 dark:text-gray-300"
							style={{ listStyleType: 'disc' }}
						>
							<li>Collaborative workspace</li>
							<li>Integrate with Slack, GitHub & more</li>
							<li>Basic page analytics</li>
							<li>7 day page history</li>
							<li>Invite 10 guests</li>
						</ul>
					</Card>
				</div>
				<div className="pricing-plans-grid">
					<Card className="flex flex-col flex-grow self-end h-full p-[28px_32px_24px]">
						<Label>Pro</Label>
						{isMonthly ? (
							<CardTitle className="pb-6 pt-2">$12</CardTitle>
						) : (
							<CardTitle className="pb-6 pt-2">$8</CardTitle>
						)}
						<Button variant="outline">Get started</Button>
						<ul
							className="pt-4 pl-4 text-gray-700 dark:text-gray-300"
							style={{ listStyleType: 'disc' }}
						>
							<li>Collaborative workspace</li>
							<li>Integrate with Slack, GitHub & more</li>
							<li>Basic page analytics</li>
							<li>7 day page history</li>
							<li>Invite 10 guests</li>
						</ul>
					</Card>
				</div>
				<div className="pricing-plans-grid">
					<Card className="flex flex-col flex-grow self-end h-full p-[28px_32px_24px]">
						<Label>King</Label>
						{isMonthly ? (
							<CardTitle className="pb-6 pt-2">$50</CardTitle>
						) : (
							<CardTitle className="pb-6 pt-2">$35</CardTitle>
						)}
						<Button variant="outline">Get started</Button>
						<ul
							className="pt-4 pl-4 text-gray-700 dark:text-gray-300"
							style={{ listStyleType: 'disc' }}
						>
							<li>Collaborative workspace</li>
							<li>Integrate with Slack, GitHub & more</li>
							<li>Basic page analytics</li>
							<li>7 day page history</li>
							<li>Invite 10 guests</li>
						</ul>
					</Card>
				</div>
			</div>
		</div>
	);
}
