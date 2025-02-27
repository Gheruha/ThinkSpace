import { NextRequest, NextResponse } from 'next/server';
import { signInUserWithOAuth } from '@/lib/utils/auth/auth.util';

export async function GET(req: NextRequest): Promise<NextResponse> {
	try {
		const url = new URL(req.url);

		const data = await signInUserWithOAuth(url);

		return NextResponse.redirect(data.url, { status: 302 });
	} catch (error: unknown) {
		console.error('Sign-in-with-oauth error:', error);
		const errorMessage = error instanceof Error ? error.message : 'Internal server error';
		return NextResponse.json({ message: errorMessage }, { status: 500 });
	}
}
