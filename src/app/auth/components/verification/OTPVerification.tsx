'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot
} from '@/components/ui/input-otp';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import useAuthStore from '@/lib/stores/authStore';

export function OTPVerification() {
	const router = useRouter();
	const email = useAuthStore((state) => state.email);
	const [otp, setOtp] = useState<string>('');

	const handleVerifyOTP = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		if (otp.length !== 6) {
			alert('Please enter a valid 6-digit OTP.');
			return;
		}

		const response = await fetch('/api/auth/verifyOTP', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, otp })
		});

		const result = await response.json();
		if (result.success) {
			router.push('/auth/resetPassword?step=reset');
			alert(result.message || 'OTPVerification successful!');
		} else {
			alert(result.message || 'OTP Verification failed!');
		}
	};

	const handleResendOTP = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
		e.preventDefault();

		const response = await fetch('/api/auth/forgotPassword', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});

		const result = await response.json();
		alert(result.message || 'OTPResend successful!');
	};

	return (
		<form onSubmit={handleVerifyOTP}>
			<Card>
				<CardHeader>
					<CardTitle className="text-xl">Verification code</CardTitle>
					<CardDescription>We have sent the code verification to</CardDescription>
					<CardDescription className="font-medium" style={{ color: 'hsl(var(--primary))' }}>
						{email}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<InputOTP maxLength={6} value={otp} onChange={(otp) => setOtp(otp)}>
						<InputOTPGroup>
							<InputOTPSlot index={0} />
							<InputOTPSlot index={1} />
							<InputOTPSlot index={2} />
						</InputOTPGroup>
						<InputOTPSeparator />
						<InputOTPGroup>
							<InputOTPSlot index={3} />
							<InputOTPSlot index={4} />
							<InputOTPSlot index={5} />
						</InputOTPGroup>
					</InputOTP>
				</CardContent>
				<CardFooter className="flex flex-col space-y-8">
					<div className="flex justify-between w-full">
						<p className="text-sm text-muted-foreground">Didn&apos;t receive OTP?</p>
						<Button variant="link" size="noSize" onClick={handleResendOTP}>
							Resend OTP
						</Button>
					</div>
					<Button type="submit" className="w-full">
						Verify
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
