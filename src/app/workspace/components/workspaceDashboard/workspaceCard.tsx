'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function WorkspaceCard() {
	return (	
		<div id="Dashboard-div" className="flex w-full h-full justify-center items-center">
			<Link href="/workspace">
				<Card className="hover:bg-accent hover:text-accent-foreground transition-hover duration-75">
					<CardHeader>
						<CardTitle>Workspace</CardTitle>
						<CardDescription>Enter your full workspace and start to organize!</CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>
			</Link>
		</div>
	);
}
