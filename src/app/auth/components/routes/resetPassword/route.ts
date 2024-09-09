import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const url = new URL(req.url);
	const formData = await req.formData();
	const email = String(formData.get('email'));

	const cookieStore = cookies();
	const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

	// Send password recovery OTP to the user's email
	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${url.origin}/auth/resetPassword` // This will redirect the user after successful OTP submission
	});

	// Handle errors or success
	if (error) {
		const errorResponse = NextResponse.redirect(`${url.origin}/auth`, {
			status: 301
		});
		errorResponse.cookies.set('isError', error.message, { path: '/' });
		return errorResponse;
	}

	// OTP sent, redirect to the reset password page
	const successResponse = NextResponse.redirect(`${url.origin}/auth/resetPassword`, {
		status: 301
	});

	return successResponse;
}
