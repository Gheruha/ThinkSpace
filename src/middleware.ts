// Redirecting the user to the login page in case there is no session

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient({ req, res });

	const {
		data: { session }
	} = await supabase.auth.getSession();

	if (!session) {
		// If there's no session, redirect to the login page
		return NextResponse.rewrite(new URL('/login', req.url));
	}
	// Always return the response object
	return res;
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
};
