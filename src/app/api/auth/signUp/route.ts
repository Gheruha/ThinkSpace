import { NextRequest, NextResponse } from 'next/server';
import { createRouteSupabaseClient } from '@/lib/supabase/client';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { firstName, lastName, email, password } = body;
		const supabase = createRouteSupabaseClient();

		// Sign up user with Supabase
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: { firstName, lastName },
				emailRedirectTo: `${req.nextUrl.origin}/api/auth/callback`
			}
		});

		if (error) {
			return NextResponse.json({ message: error.message }, { status: 400 });
		}

		return NextResponse.json({
			message: 'Sign up successful. Please verify your email.',
			user: data.user
		});
	} catch (error) {
		return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
	}
}
