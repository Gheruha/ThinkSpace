import { ForgotPasswordDto } from '@/lib/dto/auth/auth.dto';
import { forgotPassword } from '@/lib/utils/auth/auth.util';
import { checkUserExists, generateOTPCode, insertOTPCode } from '@/lib/utils/auth/token.util';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const { email }: ForgotPasswordDto = await req.json();

		// Check if user exist
		const userExists = await checkUserExists(email);
		if (!userExists) {
			return NextResponse.json(
				{ message: 'User does not exist. Please sign up first.' },
				{ status: 400 }
			);
		}

		// Generate 6-digit OTP
		const lengthCode = 6;
		const otpCode = generateOTPCode(lengthCode);
		console.log('Generated OTP:', otpCode); // Log generated OTP

		await insertOTPCode({ email, otpCode });
		await forgotPassword({ email, otpCode });

		return NextResponse.json({
			message: 'Send OTP successful.'
		});
	} catch (error) {
		return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
	}
}
