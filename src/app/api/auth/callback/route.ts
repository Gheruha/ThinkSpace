import { createSupabaseApiClient } from '@/lib/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const url = new URL(req.url);
	const code = url.searchParams.get('code');

	if (code) {
		const supabase = createSupabaseApiClient();

		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (error) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}
	}

	return NextResponse.redirect(url.origin);
}
