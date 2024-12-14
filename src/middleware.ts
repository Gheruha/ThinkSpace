import { createSupabaseMiddlewareClient } from '@/lib/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createSupabaseMiddlewareClient(req, res);

	const {
		data: { session },
		error
	} = await supabase.auth.getSession();

	if (error) {
		console.error(error);
	}

	// Extract the pathname from the URL
	const { pathname } = req.nextUrl;

	// Allow access to the product, auth, pricing pages without session
	if (
		pathname.startsWith('/product') ||
		pathname.startsWith('/auth') ||
		pathname.startsWith('/pricing')
	) {
		return res;
	}
	// Redirect to the auth page if there's no session and the user is accessing other protected routes
	if (!session) {
		return NextResponse.rewrite(new URL('/product', req.url));
	}

	// Always return the response object
	return res;
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
};
