'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { OTPVerification } from '../components/verification/OTPVerification';

export default function resetPassword() {
	const searchParams = useSearchParams();
	const [isOTPVerified, setIsOTPVerified] = useState<boolean>(false);

	useEffect(() => {
		const step = searchParams.get('step');
		if (step === 'otp') {
			setIsOTPVerified(false);
		} else if (step === 'reset') {
			setIsOTPVerified(true);
		}
	}, [searchParams]);

	return (
		<div className="flex justify-center items-center h-screen">
			{isOTPVerified ? <div>ResetPasswordForm</div> : <OTPVerification />}
		</div>
	);
}
