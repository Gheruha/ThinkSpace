import { NextRequest, NextResponse } from 'next/server';
import { checkUserExists } from '@/lib/utils/user.utils';
import { signInUser } from '@/lib/utils/auth/auth.utils';
import { SignInDto } from '@/types/auth.type';
import { isValidSignInDto } from '@/lib/utils/auth/auth-validation';

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const body: unknown = await req.json();

		if (!isValidSignInDto(body)) {
			return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
		}

		const { email, password }: SignInDto = body;

		// Check if user exist
		const doesUserExist = await checkUserExists(email);
		if (!doesUserExist) {
			return NextResponse.json(
				{ message: 'User does not exist. Please sign up first.' },
				{ status: 400 }
			);
		}

		// Sign in the user
		const userSession = await signInUser({ email, password });

		return NextResponse.json({
			message: 'Sign in successful!',
			session: userSession,
			redirect: '/workspace'
		});
	} catch (error: unknown) {
		console.error('Sign-in error:', error);
		const errorMessage = error instanceof Error ? error.message : 'Internal server error';
		return NextResponse.json({ message: errorMessage }, { status: 500 });
	}
}
