'use client';
import React, { useEffect } from 'react';
import { LoginForm } from './components/forms/log_in';
import { SignUpForm } from './components/forms/sign_up';
import { useButtonContext } from '@/app/product/components/clickedButton';
import { useToast } from '@/components/ui/use-toast';

export default function Auth() {
	const { toast } = useToast();
	const { clickedButton, setClickedButton } = useButtonContext();

	useEffect(() => {
		const storedButton = localStorage.getItem('clickedButton');
		if (storedButton) {
			setClickedButton(storedButton);
		}
	}, [setClickedButton]);

	// Retrieve the isError cookie value
	useEffect(() => {
		const isError = document.cookie
			.split('; ')
			.find((row) => row.startsWith('isError='))
			?.split('=')[1];

		if (isError && isError !== 'undefined') {
			const decodedError = decodeURIComponent(isError);
			toast({
				variant: 'destructive',
				description: decodedError,
				duration: 60000
			});
		}
		document.cookie = 'isError=; Max-Age=0; path=/';
	}, [toast]);

	return (
		<div className="flex justify-center items-center h-screen">
			{clickedButton === 'Sign Up' ? <SignUpForm /> : <LoginForm />}
		</div>
	);
}
