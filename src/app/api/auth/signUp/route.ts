import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseApiClient, createClientSupabaseServiceRole } from '@/lib/supabase/client';

export async function POST(req: NextRequest) {
	try {
		const url = new URL(req.url);
		const supabaseApi = createSupabaseApiClient();
		const supabaseServiceRole = createClientSupabaseServiceRole();
		const { firstName, lastName, email, password } = await req.json();

		// Check if user exist in supabase
		const { data: users, error: userError } = await supabaseServiceRole.auth.admin.listUsers();
		if (userError || !users) {
			return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
		}

		// Find the user by email
		const user = users?.users.find((u) => u.email === email);

		// If user already exists
		if (user) {
			return NextResponse.json(
				{ message: 'Already signed up, you must sign in.' },
				{ status: 400 }
			);
		}

		// Sign up user with Supabase
		const { data, error } = await supabaseApi.auth.signUp({
			email,
			password,
			options: {
				data: { firstName, lastName },
				emailRedirectTo: `${url.origin}/api/auth/callback`
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
