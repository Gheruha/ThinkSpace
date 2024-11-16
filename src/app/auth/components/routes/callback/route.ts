import { getRouteHandlerSupabaseClient } from '@/lib/supabaseClients';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const url = new URL(req.url);
	const code = url.searchParams.get('code');

	if (code) {
		const supabase = getRouteHandlerSupabaseClient();

		await supabase.auth.exchangeCodeForSession(code);
	}

	return NextResponse.redirect(url.origin);
}
