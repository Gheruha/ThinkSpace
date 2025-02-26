'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { OTPVerification } from '@/app/auth/components/verification/OTPVerification';
import { PasswordResetForm } from '@/app/auth/components/verification/passwordResetForm';
import Loader, { LoaderEnum } from '@/components/Loader';

function ResetPasswordContent() {
	const searchParams = useSearchParams();
	const stepParam = searchParams.get('step')?.toLowerCase();
	const resetPasswordStep = stepParam === 'otp' || stepParam === 'reset' ? stepParam : 'otp';

	const resetPasswordForms = {
		otp: <OTPVerification />,
		reset: <PasswordResetForm />
	} as const;

	return resetPasswordForms[resetPasswordStep];
}

export default function ResetPassword() {
	return (
		<Suspense fallback={<Loader loader={LoaderEnum.HELIX} />}>
			<ResetPasswordContent />
		</Suspense>
	);
}
