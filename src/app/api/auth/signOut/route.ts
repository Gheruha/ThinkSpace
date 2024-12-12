import { NextResponse } from 'next/server';
import { signOutUser } from '@/lib/utils/auth/auth.util';

export async function POST() {
	try {
		await signOutUser();

		return NextResponse.json({
			message: 'User signed out successfully.'
		});
	} catch (error) {
		return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
	}
}
