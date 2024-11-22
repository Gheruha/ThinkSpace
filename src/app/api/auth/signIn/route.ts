import { NextRequest, NextResponse } from 'next/server';
import { createRouteSupabaseClient } from '@/lib/supabase/client';

export async function POST(req: NextRequest) {
	try {
		const supabase = createRouteSupabaseClient();
		const { email, password } = await req.json();

		// Sign in user with Supabase
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			return NextResponse.json({ message: error.message }, { status: 400 });
		}

		return NextResponse.json({
			message: 'Sign in successful.',
			session: data.session
		});
	} catch (error) {
		return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
	}
}
