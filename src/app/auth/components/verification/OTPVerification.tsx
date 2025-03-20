'use client';

import { useResendOtpHandler, useVerifyOtpHandler } from '../handleFunctions';
import { useOTPForm } from '../validationSchema';
import { useUserDataFromLocalStorage } from '@/lib/store/local-storage.util';
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
import { Button } from '@/components/ui/button';

export function OTPVerification() {
	const verifyOtpHandler = useVerifyOtpHandler();
	const resendOtpHandler = useResendOtpHandler();
	const userData = useUserDataFromLocalStorage();
	const email = userData?.email;

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors }
	} = useOTPForm();

	return (
		<form noValidate onSubmit={handleSubmit((data) => verifyOtpHandler(data))}>
			<Card>
				<CardHeader>
					<CardTitle className="text-xl">Verification code</CardTitle>
					<CardDescription>We have sent the code verification to</CardDescription>
					<CardDescription className="font-medium" style={{ color: 'hsl(var(--primary))' }}>
						{email}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<input type="hidden" {...register('otpCode')} />
					<InputOTP
						maxLength={6}
						value={watch('otpCode') || ''}
						onChange={(value: string) => setValue('otpCode', value, { shouldValidate: true })}
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
						<Button variant="link" size="noSize" onClick={resendOtpHandler}>
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
