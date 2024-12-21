import { NextResponse, NextRequest } from 'next/server';
import { signOutUser } from '@/lib/utils/auth/auth.util';

export async function POST(req: NextRequest) {
	try {
		// Sign out the user
		await signOutUser();

		return NextResponse.json({
			message: 'User signed out successfully.'
		});
	} catch (error) {
		return NextResponse.json({ message: 'Internal server error.', error }, { status: 500 });
	}
}
