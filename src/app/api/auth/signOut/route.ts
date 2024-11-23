import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseApiClient } from '@/lib/supabase/client';

export async function POST(req: NextRequest) {
	try {
		const supabaseApi = createSupabaseApiClient();

		// Sign out user with Supabase
		const { error } = await supabaseApi.auth.signOut();

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		return NextResponse.json({
			message: 'Sign out successful.'
		});
	} catch (error) {
		return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
	}
}
