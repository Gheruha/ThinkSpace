import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const url = new URL(req.url);
	let isMail = false;
	let isSignedUp = false;

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

	if (data.user?.user_metadata.email_verified === false) {
		isMail = true;
	} else if (
		data.user?.user_metadata.email_verified === true ||
		data.user?.user_metadata.length < 1
	) {
		isSignedUp = true;
	}

	console.log(data);
	console.log(error);

	const response = NextResponse.redirect(`${url.origin}/auth/`, {
		status: 301
	});
	response.cookies.set('isMail', String(isMail), { path: '/' });
	response.cookies.set('isSignedUp', String(isSignedUp), { path: '/' });
	response.cookies.set('isError', String(error?.message), { path: '/' });
	return response;
}
