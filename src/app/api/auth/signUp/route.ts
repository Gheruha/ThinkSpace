import { NextRequest, NextResponse } from 'next/server';
import { checkUserExists } from '@/lib/utils/auth/token.util';
import { signUpUser } from '@/lib/utils/auth/auth.util';
import { SignUpDto } from '@/lib/dto/auth/auth.dto';

export async function POST(req: NextRequest) {
	try {
		const url = new URL(req.url);
		const { firstName, lastName, email, password }: SignUpDto = await req.json();

		// Check if user exist
		const userExists = await checkUserExists(email);
		if (userExists) {
			return NextResponse.json(
				{ message: 'Already signed up, you must sign in.' },
				{ status: 400 }
			);
		}

		// Sign up the user
		const session = await signUpUser({
			firstName,
			lastName,
			email,
			password,
			redirectUrl: `${url.origin}/api/auth/callback`
		});

		return NextResponse.json({
			message: 'Sign up successful.',
			session: session.session
		});
	} catch (error) {
		return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
	}
}
