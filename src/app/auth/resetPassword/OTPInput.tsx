'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot
} from '@/components/ui/input-otp';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form } from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface OTPInputProps {
	email: string; // Accept email as a prop
}

const formSchema = z.object({
	email: z.string().min(1, { message: 'OTP is required' })
});

export function OTPInput({ email }: OTPInputProps) {
	const [otp, setOtp] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const router = useRouter();

	const handleVerifyOTP = async () => {
		try {
			const response = await fetch('/auth/api/verifyOTP', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ otp, email })
			});

			const result = await response.json();
			console.log(result);

			if (response.ok) {
				// OTP verified successfully, navigate to the reset password form
				router.push('/auth/resetPassword');
			} else {
				// OTP verification failed
				setErrorMessage(result.message || 'Invalid OTP');
			}
		} catch (error) {
			console.error('Error verifying OTP:', error);
			setErrorMessage('An error occurred while verifying OTP');
		}
	};

	const handleResendOTP = async () => {
		// Logic to resend the OTP
		try {
			const response = await fetch('/auth/api/resendOTP', {
				method: 'POST',
				body: new URLSearchParams({ email })
			});

			const result = await response.json();
			console.log(result);

			if (response.ok) {
				// Notify the user that OTP has been resent
				alert('OTP has been resent to your email.');
			} else {
				// Handle resend OTP failure
				setErrorMessage(result.message || 'Failed to resend OTP');
			}
		} catch (error) {
			console.error('Error resending OTP:', error);
			setErrorMessage('An error occurred while resending OTP');
		}
	};

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: ''
		}
	});

	return (
		<Form {...form}>
			<form action={handleVerifyOTP}>
				<Card className="">
					<CardHeader className="">
						<CardTitle className="text-xl">Verification code</CardTitle>
						<CardDescription>We have sent the code verification to</CardDescription>
						<CardDescription className="font-medium" style={{ color: 'hsl(var(--primary))' }}>
							{email}
						</CardDescription>
					</CardHeader>
					<CardContent className="">
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
						{errorMessage && <p className="text-red-500">{errorMessage}</p>}
					</CardContent>
					<CardFooter className="flex flex-col space-y-8">
						<div className="flex justify-between w-full">
							<p className="text-sm text-muted-foreground">Didn&apos;t receive OTP?</p>
							<Button variant="link" size="noSize" onClick={handleResendOTP}>
								Resend OTP
							</Button>
						</div>
						<Button type="button" className="w-full" onClick={handleVerifyOTP}>
							Verify
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}
