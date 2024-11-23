'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SignUpForm } from './components/authentication/signUpForm';
import { SignInForm } from './components/authentication/signInForm';

function AuthContent() {
	const searchParams = useSearchParams();
	const mode = searchParams.get('mode')?.toLowerCase();

	const renderForm = () => {
		switch (mode) {
			case 'signup':
				return <SignUpForm />;
			case 'signin':
			default:
				return <SignInForm />;
		}
	};

	return <div>{renderForm()}</div>;
}

export default function Auth() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<AuthContent />
		</Suspense>
	);
}
