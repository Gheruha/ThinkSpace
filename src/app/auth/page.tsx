'use client';
import React, { useEffect } from 'react';
import { LoginForm } from './components/forms/log_in';
import { SignUpForm } from './components/forms/sign_up';
import { useButtonContext } from '@/app/product/components/clickedButton';

export default function Auth() {
	const { clickedButton, setClickedButton } = useButtonContext();

	useEffect(() => {
		const storedButton = localStorage.getItem('clickedButton');
		if (storedButton) {
			setClickedButton(storedButton);
		}
	}, [setClickedButton]);

	return (
		<div className="flex justify-center items-center h-screen">
			{clickedButton === 'Sign Up' ? <SignUpForm /> : <LoginForm />}
		</div>
	);
}
