'use client';

import { useState } from 'react';
import { OTPInput } from './OTPInput';
import { ResetPassword } from './resetPassword';

export default function Reset() {
	const [isOTPConfirmed, setIsOTPConfirmed] = useState(true);

	return (
		<div className="flex justify-center items-center h-screen">
			{isOTPConfirmed ? <OTPInput /> : <ResetPassword />}
		</div>
	);
}
