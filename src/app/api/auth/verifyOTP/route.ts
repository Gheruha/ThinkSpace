import { NextRequest, NextResponse } from 'next/server';
import { verifyUserOtp } from '@/lib/utils/auth/auth.utils';
import { VerifyOtpDto } from '@/types/auth.type';
import { isValidVerifyOtpDto } from '@/lib/utils/auth/auth-validation';

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const body: unknown = await req.json();

		if (!isValidVerifyOtpDto(body)) {
			return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
		}

		const { email, otpCode }: VerifyOtpDto = body;
		await verifyUserOtp({ email, otpCode });

		return NextResponse.json({
			message: 'Verify OTP successful!'
		});
	} catch (error: unknown) {
		console.error('Verify-otp error:', error);
		const errorMessage = error instanceof Error ? error.message : 'Internal server error';
		return NextResponse.json({ message: errorMessage }, { status: 500 });
	}
}
