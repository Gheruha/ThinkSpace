'use client';

import { toast } from '@/components/ui/use-toast';
import { authService } from '@/lib/services/auth/auth.service';

// OAuth.tsx
export const handleSignInWithOAuth = async (): Promise<void> => {
	try {
		const { message } = await authService.signInWithOAuth();
		toast({ description: message, variant: 'default' });
	} catch (error: any) {
		toast({
			description: error.message,
			variant: 'destructive'
		});
	}
};

// signInForm.tsx

// signUpForm.tsx

// OTPVerification.tsx

// passwordResetForm.tsx
