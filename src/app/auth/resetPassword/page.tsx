'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { OTPVerification } from '../components/verification/OTPVerification';
import { PasswordResetForm } from '../components/verification/passwordResetForm';

function ResetPasswordContent() {
	const searchParams = useSearchParams();
	const step = searchParams.get('step')?.toLowerCase();

	const renderForm = () => {
		switch (step) {
			case 'reset':
				return <PasswordResetForm />;
			case 'otp':
			default:
				return <OTPVerification />;
		}
	};

	return <div>{renderForm()}</div>;
}

export default function ResetPassword() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ResetPasswordContent />
		</Suspense>
	);
}
