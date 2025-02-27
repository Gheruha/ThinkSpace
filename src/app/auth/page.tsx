'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SignUpForm } from '@/app/auth/components/authentication/signUpForm';
import { SignInForm } from '@/app/auth/components/authentication/signInForm';
import { OAuth } from '@/app/auth/components/authentication/OAuth';
import Loader, { LoaderEnum } from '@/components/Loader';

function AuthContent() {
	const searchParams = useSearchParams();
	const modeParam = searchParams.get('mode')?.toLowerCase();
	const authMode = modeParam === 'signup' || modeParam === 'signin' ? modeParam : 'signin';

	const authForms = {
		signup: <SignUpForm />,
		signin: <SignInForm />
	} as const;

	return (
		<>
			{authForms[authMode]}
			<OAuth />
		</>
	);
}

export default function Auth() {
	return (
		<Suspense fallback={<Loader loader={LoaderEnum.HELIX} />}>
			<AuthContent />
		</Suspense>
	);
}
