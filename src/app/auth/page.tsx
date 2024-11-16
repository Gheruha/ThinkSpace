'use client';

import { useState } from 'react';
import SignUpForm from './components/forms/signUp';

export default function Auth() {
	const [isSignUp, setIsSignUp] = useState<boolean>(true);

	return (
		<div className="flex justify-center items-center h-screen">
			{isSignUp ? <SignUpForm switchForm={() => setIsSignUp(false)} /> : <div>Login</div>}
		</div>
	);
}
