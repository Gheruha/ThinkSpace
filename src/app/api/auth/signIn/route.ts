import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseApiClient, createClientSupabaseServiceRole } from '@/lib/supabase/client';

export async function POST(req: NextRequest) {
	try {
		const supabaseApi = createSupabaseApiClient();
		const supabaseServiceRole = createClientSupabaseServiceRole();
		const { email, password } = await req.json();

		// Check if user exist in supabase
		const { data: users, error: userError } = await supabaseServiceRole.auth.admin.listUsers();
		if (userError || !users) {
			return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
		}

		// Find the user by email
		const user = users?.users.find((u) => u.email === email);

		// If user not exists
		if (!user) {
			return NextResponse.json(
				{ message: 'User does not exist. Please sign up first.' },
				{ status: 400 }
			);
		}

		// Sign in user with Supabase
		const { data, error } = await supabaseApi.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			return NextResponse.json({ message: error.message }, { status: 400 });
		}

		return NextResponse.json({
			message: 'Sign in successful.',
			session: data.session,
			redirect: '/'
		});
	} catch (error) {
		return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
	}
}
