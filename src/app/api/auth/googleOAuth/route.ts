import { signInUserWithOAuth } from '@/lib/utils/auth/auth.util';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const url = new URL(req.url);

		const data = await signInUserWithOAuth(url);

		return NextResponse.redirect(data.url, { status: 302 });
	} catch (error) {
		return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
	}
}
