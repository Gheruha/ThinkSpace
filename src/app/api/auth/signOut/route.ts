import { NextResponse, NextRequest } from 'next/server';
import { signOutUser } from '@/lib/utils/auth/auth.util';
import { checkUserExists } from '@/lib/utils/auth/token.util';

export async function POST(req: NextRequest) {
	try {
		// const { email } = await req.json();

		// Check if user exist
		// const userExists = await checkUserExists(email);
		// if (!userExists) {
		// 	return NextResponse.json(
		// 		{ message: "User does not exist. Can't sign out." },
		// 		{ status: 400 }
		// 	);
		// }

		// Sign out the user
		await signOutUser();

		return NextResponse.json({
			message: 'User signed out successfully.'
		});
	} catch (error) {
		return NextResponse.json({ message: 'Internal server error.', error }, { status: 500 });
	}
}
