import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

export const GoogleOAuth = () => {
	const handleGoogleSignIn = async () => {
		try {
			const response = await fetch('/api/auth/googleOAuth', {
				method: 'POST'
			});

			if (!response.ok) {
				throw new Error('Error initiating Google sign-in');
			}
		} catch (error) {
			console.error('Error signing in with Google:');
		}
	};

	return (
		<Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
			Sign in with Google
		</Button>
	);
};
