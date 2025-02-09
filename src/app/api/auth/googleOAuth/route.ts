import { createSupabaseApiClient } from '@/lib/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const url = new URL(req.url);
	const supabase = await createSupabaseApiClient();

	// Redirect the user to the Google OAuth page
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${url.origin}/api/auth/callback`
		}
	});

	if (error) {
		console.error('Error initiating Google sign-in:', error.message);
		return NextResponse.redirect(`${url.origin}/auth/error`, { status: 301 });
	}

	return NextResponse.redirect(data.url, { status: 302 });
}
