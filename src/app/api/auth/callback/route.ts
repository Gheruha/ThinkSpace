import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForSession } from '@/lib/utils/auth/auth.util';

export async function GET(req: NextRequest) {
	try {
		const url = new URL(req.url);
		const code = url.searchParams.get('code');

		if (code) {
			await exchangeCodeForSession(code);
		}

		return NextResponse.redirect(url.origin);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}
