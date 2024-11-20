'use client';

import { useSearchParams } from 'next/navigation';
import { OTPVerification } from '../components/verification/OTPVerification';
import { PasswordResetForm } from '../components/verification/passwordResetForm';

export default function resetPassword() {
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
