import { authService } from '@/lib/services/api/auth.api';
import { Button } from './button';
import { toast } from './use-toast';

export function LogOutBtn() {
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
			<Button variant="secondary" onClick={handleSignOut}>
				Log Out
			</Button>
		</div>
	);
}
