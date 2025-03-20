import { NextResponse, NextRequest } from 'next/server';
import { signOutUser } from '@/lib/utils/auth/auth.utils';

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		// Sign out the user
		await signOutUser();

		return NextResponse.json({
			message: 'User signed out successfully!'
		});
	} catch (error: unknown) {
		console.error('Sign-out error:', error);
		const errorMessage = error instanceof Error ? error.message : 'Internal server error';
		return NextResponse.json({ message: errorMessage }, { status: 500 });
	}
}
