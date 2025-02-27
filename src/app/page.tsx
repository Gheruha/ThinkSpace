'use client';

import { Button } from '@/components/ui/button';
import { authService } from '@/lib/services/auth/auth.service';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import WorkspaceCard from './workspace/components/dashboard/workspaceCard';

//
import Loader from '@/components/Loader';
import { LoaderEnum } from '@/components/Loader';
//

export default function Main() {
	const { toast } = useToast();

	const handleSignOut = async (): Promise<void> => {
		try {
			const { message } = await authService.signOut();
			toast({ description: message, variant: 'default' });
		} catch (error: any) {
			toast({
				description: error.message,
				variant: 'destructive'
			});
		}
	};

	return (
		<div id="MainDashboard-div" className="w-full h-[100vh] p-4">
			<div id="LogOut-div" className="fixed">
				<Button size="xs" variant="ghost" className="rounded-sm" onClick={handleSignOut}>
					<span className="text-lg font-normal">Sign Out</span>
				</Button>
			</div>

			<div id="Dashboard-div" className="flex w-full h-full justify-center items-center">
				<div className="flex h-screen items-center justify-center">
					<div className="w-16 h-16 flex items-center justify-center">
						<Loader loader={LoaderEnum.HELIX} size={45} speed={2.5} color="white" />
					</div>
				</div>
				<Link href="/workspace">
					<Card className="hover:bg-accent hover:text-accent-foreground transition-hover duration-75">
						<CardHeader>
							<CardTitle>Workspace</CardTitle>
							<CardDescription>Enter your full workspace and start to organize!</CardDescription>
						</CardHeader>
						<CardContent></CardContent>
					</Card>
				</Link>
				<div className="flex h-screen items-center justify-center">
					<div className="w-16 h-16 flex items-center justify-center">
						<Loader loader={LoaderEnum.HELIX} size={45} speed={2.5} color="white" />
					</div>
				</div>
			</div>
		</div>
	);
}
