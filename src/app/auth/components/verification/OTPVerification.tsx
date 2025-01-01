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
import useAuthStore from '@/lib/store/auth/auth.store';
import { authService } from '@/lib/services/auth/auth.service';
import { useToast } from '@/components/ui/use-toast';

// Validation schema
const otpVerificationSchema = z.object({
	otp: z
		.string()
		.min(6, 'OTP must be exactly 6 digits.')
		.max(6, 'OTP must be exactly 6 digits.')
		.regex(/^\d+$/, 'OTP must contain only numeric characters.')
});

interface InputOTPProps {
	otpCode: string;
	onChange: (newValue: string) => void;
	maxLength: number;
	children: React.ReactNode;
}

export function OTPVerification() {
	const router = useRouter();
	const { toast } = useToast();
	// const user = useAuthStore((state) => state.user);
	// console.log('Current User:', user);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors }
	} = useForm<InputOTPProps>({
		resolver: zodResolver(otpVerificationSchema)
	});

	const handleVerifyOTP: SubmitHandler<InputOTPProps> = async (verifyOTPData) => {
		try {
			// const email = user?.email;
			const otpCode = verifyOTPData.otpCode;
			// const { message } = await authService.verifyOTP({ email, otpCode });
			// toast({ description: message, variant: 'default' });
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
			headers: { 'Content-Type': 'application/json' }
			// body: JSON.stringify({ email })
		});

		const result = await response.json();
		alert(result.message || 'OTPResend successful!');
	};

	// console.log('User from OTPVerification:', user);

	return (
		<form noValidate onSubmit={handleSubmit(handleVerifyOTP)}>
			<Card>
				<CardHeader>
					<CardTitle className="text-xl">Verification code</CardTitle>
					<CardDescription>We have sent the code verification to</CardDescription>
					<CardDescription className="font-medium" style={{ color: 'hsl(var(--primary))' }}>
						{/* {user?.email} */}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<input type="hidden" {...register('otpCode')} />
					<InputOTP
						maxLength={6}
						value={watch('otpCode') || ''}
						onChange={(value: string) => setValue('otpCode', value)}
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
					{errors.otpCode && <p className="text-red-500 text-sm">{errors.otpCode.message}</p>}
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
