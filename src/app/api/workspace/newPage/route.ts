import { createSupabaseApiClient } from '@/lib/supabase/client';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
	try {
		// Supabase client
		const supabase = await createSupabaseApiClient();

		// Getting the session
		const { data, error } = await supabase.auth.getSession();

		if (error || !data) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 400 });
			// status 400: Client Error
		}
		return NextResponse.json('Session Data:', { status: 201 });
	} catch (err: any) {}
}
