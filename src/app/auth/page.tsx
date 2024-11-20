'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SignUpForm } from './components/forms/signUpForm';
import { SignInForm } from './components/forms/signInForm';

export default function Auth() {
	const searchParams = useSearchParams();

	const mode = searchParams.get('mode');
	const isSignUp = mode === 'signUp';

	return (
		<div className="flex justify-center items-center h-screen">
			{isSignUp ? <SignUpForm /> : <SignInForm />}
		</div>
	);
}
