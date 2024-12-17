import { NextRequest, NextResponse } from 'next/server';
import { checkUserExists } from '@/lib/utils/auth/token.util';
import { signInUser } from '@/lib/utils/auth/auth.util';
import { SignInDto } from '@/lib/dto/auth/auth.dto';

export async function POST(req: NextRequest) {
	try {
		const { email, password }: SignInDto = await req.json();

		// Check if user exist
		const userExists = await checkUserExists(email);
		if (!userExists) {
			return NextResponse.json(
				{ message: 'User does not exist. Please sign up first.' },
				{ status: 400 }
			);
		}

		// Sign in the user
		const session = await signInUser({ email, password });

		return NextResponse.json({
			message: 'Sign in successful.',
			session: session.session,
			redirect: '/'
		});
	} catch (error: any) {
		return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
	}
}
