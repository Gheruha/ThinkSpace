'use client';

import { useState } from 'react';
import { OTPInput } from './OTPInput';
import { ResetPassword } from './resetPassword';
import { getEmail } from '@/app/auth/components/forms/log_in';

export default function Reset() {
	const [isOTPConfirmed, setIsOTPConfirmed] = useState(false);
	const email = getEmail();
	console.log(email);

	return (
		<div className="flex justify-center items-center h-screen">
			{isOTPConfirmed ? <ResetPassword /> : <OTPInput email={email} />}
		</div>
	);
}
