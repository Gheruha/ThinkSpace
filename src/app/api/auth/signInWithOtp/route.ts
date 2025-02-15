import { NextRequest, NextResponse } from 'next/server';
import { checkUserExists } from '@/lib/utils/auth/token.util';
import { signInUserWithOtp } from '@/lib/utils/auth/auth.util';
import { SignInWithOtpDto } from '@/lib/dto/auth/auth.dto';
import { isValidSignInWithOtpDto } from '@/lib/dto/auth/isValid.dto';

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const body: unknown = await req.json();

		if (!isValidSignInWithOtpDto(body)) {
			return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
		}

		const { email }: SignInWithOtpDto = body;

		// Check if user already exist
		const doesUserExist = await checkUserExists(email);
		if (!doesUserExist) {
			return NextResponse.json(
				{ message: 'User does not exist. Please sign up first.' },
				{ status: 400 }
			);
		}

		const userData = await signInUserWithOtp({ email });

		return NextResponse.json({
			message: 'Send OTP successful!',
			userData
		});
	} catch (error: unknown) {
		console.error('Sign-in-with-otp error:', error);
		const errorMessage = error instanceof Error ? error.message : 'Internal server error';
		return NextResponse.json({ message: errorMessage }, { status: 500 });
	}
}
