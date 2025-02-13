import { createSupabaseApiClient } from '@/lib/supabase/client';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
	try {
		// Supabase client
		const supabase = await createSupabaseApiClient();

		// Getting the session
		const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
		if (sessionError || !sessionData) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 400 });
			// status 400: Client Error
		}
		// Store userID
		const userId = sessionData.session?.user.id;

		// Inserting default data into the database
		const { data, error } = await supabase
			.from('Page')
			.insert([{ Title: 'Default Page', user_id: userId }]);

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		return NextResponse.json(data, { status: 201 });
	} catch (err: any) {}
}
