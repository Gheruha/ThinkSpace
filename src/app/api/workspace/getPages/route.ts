import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseApiClient } from '@/lib/supabase/client';

export async function GET(req: NextRequest) {
	// Creating the client and getting the session
	const supabase = await createSupabaseApiClient();
	const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

	if (sessionError || !sessionData) {
		NextResponse.json({ error: sessionError, status: 400 });
	}

	// Extracting the user id
	const userId = sessionData.session?.user.id;

	// Query the "Page" table for records belonging to the current user
	const { data: pages } = await supabase
		.from('Page')
		.select('id, Title, created_at')
		.eq('user_id', userId);

	return NextResponse.json(pages, { status: 200 });
}
