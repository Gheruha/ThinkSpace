'use client';

import { useState } from 'react';
import { SignUpForm } from './components/forms/signUp';
import { SignInForm } from './components/forms/signIn';

export default function Auth() {
	const [isSignUp, setIsSignUp] = useState<boolean>(true);

	return (
		<div className="flex justify-center items-center h-screen">
			{isSignUp ? (
				<SignUpForm switchForm={() => setIsSignUp(false)} />
			) : (
				<SignInForm switchForm={() => setIsSignUp(true)} />
			)}
		</div>
	);
}
