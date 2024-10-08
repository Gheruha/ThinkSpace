import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const url = new URL(req.url);
	const cookieStore = cookies();

	const supabase = createRouteHandlerClient({
		cookies: () => cookieStore
	});

	const { error } = await supabase.auth.signOut({});

	const response = NextResponse.redirect(`${url.origin}`, {
		status: 301
	});

	response.cookies.set('isError', String(error?.message), { path: '/' });

	return response;
}
