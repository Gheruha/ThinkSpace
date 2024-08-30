import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const url = new URL(req.url);
	let isUser = false;

	const formData = await req.formData();
	const email = String(formData.get('email'));
	const password = String(formData.get('password'));

	const cookieStore = cookies();

	const supabase = createRouteHandlerClient({
		cookies: () => cookieStore
	});

	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: { emailRedirectTo: `${url.origin}/auth/components/routes/callback` }
	});

	if (data.user) isUser = true;
	if (error) console.log(error);

	const response = NextResponse.redirect(`${url.origin}/auth/`, {
		status: 301
	});
	response.cookies.set('isUser', String(isUser), { path: '/' });

	return response;
}
