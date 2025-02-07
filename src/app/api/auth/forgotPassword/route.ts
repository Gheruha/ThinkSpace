import { ForgotPasswordDto } from '@/lib/dto/auth/auth.dto';
import { signInUserWithOtp } from '@/lib/utils/auth/auth.util';
import { checkUserExists } from '@/lib/utils/auth/token.util';
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

		const userData = await signInUserWithOtp({ email });

		return NextResponse.json({
			message: 'Send OTP successful.',
			userData
		});
	} catch (error) {
		return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
	}
}
