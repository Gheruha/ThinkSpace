'use client';
import { Button } from '@/components/ui/button';
import { authService } from '@/lib/services/auth/auth.service';
import { useToast } from '@/components/ui/use-toast';

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
		<div>
			<Button size="xs" variant="ghost" className="rounded-sm" onClick={handleSignOut}>
				<span className="text-lg font-normal">Sign Out</span>
			</Button>
		</div>
	);
}
