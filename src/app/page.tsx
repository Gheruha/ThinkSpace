'use client';
import { Button } from '@/components/ui/button';
import { authService } from '@/lib/services/auth/auth.service';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import WorkspaceCard from './workspace/components/dashboard/workspaceCard';

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

			<WorkspaceCard />
		</div>
	);
}
