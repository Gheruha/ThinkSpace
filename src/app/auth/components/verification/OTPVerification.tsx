'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
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
import { authService } from '@/lib/services/auth/auth.service';
import { useToast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';

// Validation schema
const otpVerificationSchema = z.object({
	otp: z
		.string()
		.min(6, 'OTP must be exactly 6 digits.')
		.max(6, 'OTP must be exactly 6 digits.')
		.regex(/^\d+$/, 'OTP must contain only numeric characters.')
});

interface OTPFormData {
	otp: string;
}

export function OTPVerification() {
	const router = useRouter();
	const { toast } = useToast();
	const [email, setEmail] = useState<string>('');

	useEffect(() => {
		// Retrieve user data from localStorage
		const storedUserData = localStorage.getItem('userData');
		if (storedUserData) {
			try {
				const parsedUser = JSON.parse(storedUserData);
				setEmail(parsedUser.email || '');
			} catch (error) {
				console.error('Error parsing userData from localStorage:', error);
			}
		}
	}, []);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors }
	} = useForm<OTPFormData>({
		resolver: zodResolver(otpVerificationSchema),
		defaultValues: { otp: '' }
	});

	const handleVerifyOTP: SubmitHandler<OTPFormData> = async (verifyOTPData) => {
		try {
			console.log('\n\nIn handleVerifyOTP from client\n\n');
			const otpCode = verifyOTPData.otp;
			console.log(otpCode);
			console.log(email);
			const { message } = await authService.verifyOTP({ email, otpCode });
			toast({ description: message, variant: 'default' });
			router.push('/auth/resetPassword?step=reset');
		} catch (error: any) {
			toast({
				description: error.message,
				variant: 'destructive'
			});
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
		<form
			noValidate
			onSubmit={handleSubmit((data) => {
				console.log('Form submitted with:', data);
				handleVerifyOTP(data);
			})}
		>
			<Card>
				<CardHeader>
					<CardTitle className="text-xl">Verification code</CardTitle>
					<CardDescription>We have sent the code verification to</CardDescription>
					<CardDescription className="font-medium" style={{ color: 'hsl(var(--primary))' }}>
						{email}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<input type="hidden" {...register('otp')} />
					<InputOTP
						maxLength={6}
						value={watch('otp') || ''}
						onChange={(value: string) => setValue('otp', value, { shouldValidate: true })}
					>
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
					{errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}
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
