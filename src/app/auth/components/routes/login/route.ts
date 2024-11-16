import { getRouteHandlerSupabaseClient } from '@/lib/supabaseClients';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const url = new URL(req.url);

	const formData = await req.formData();
	const email = String(formData.get('email'));
	const password = String(formData.get('password'));

	const supabase = getRouteHandlerSupabaseClient();
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	if (error) {
		// If there is an error, redirect to the /auth page
		const errorResponse = NextResponse.redirect(`${url.origin}/auth`, {
			status: 301
		});
		// Store the error message in a cookie
		errorResponse.cookies.set('isError', error.message, { path: '/' });
		return errorResponse;
	}

	// If no error, redirect to the original URL
	const successResponse = NextResponse.redirect(`${url.origin}`, {
		status: 301
	});
	return successResponse;
}
