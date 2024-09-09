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

export function OTPInput() {
	const [value, setValue] = useState('');

	return (
		<Card className="">
			<CardHeader className="">
				<CardTitle className="text-xl">Verification code</CardTitle>
				<CardDescription>We have sent the code verification to</CardDescription>
				<CardDescription className="font-medium" style={{ color: 'hsl(var(--primary))' }}>
					example@gmail.com
				</CardDescription>
			</CardHeader>
			<CardContent className="">
				<InputOTP maxLength={6} value={value} onChange={(value) => setValue(value)}>
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
					<Button variant="link" size="noSize">
						Resend OTP
					</Button>
				</div>
				<Button type="submit" className="w-full">
					Verify
				</Button>
			</CardFooter>
		</Card>
	);
}
