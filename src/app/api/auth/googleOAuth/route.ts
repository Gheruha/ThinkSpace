import { NextRequest, NextResponse } from 'next/server';
import { signInUserWithOAuth } from '@/lib/utils/auth/auth.utils';

export async function GET(req: NextRequest): Promise<NextResponse> {
	try {
		const url = new URL(req.url);
		const redirectUrl = await signInUserWithOAuth(url);

		return NextResponse.redirect(redirectUrl, { status: 302 });
	} catch (error: unknown) {
		console.error('Sign-in-with-oauth error:', error);
		const errorMessage = error instanceof Error ? error.message : 'Internal server error';
		return NextResponse.json({ message: errorMessage }, { status: 500 });
	}
}
