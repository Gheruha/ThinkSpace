import { NextRequest, NextResponse } from 'next/server';
import { randomInt } from 'crypto';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
	const url = new URL(req.url);
	const formData = await req.formData();
	const email = String(formData.get('email'));

	const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
	const supabaseKey: string = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

	if (!supabaseUrl || !supabaseKey) {
		throw new Error('Supabase URL or anonymous key is missing from environment variables');
	}

	const supabase = createClient(supabaseUrl, supabaseKey);

	// Query the users table to check if the email exists
	const { data: users, error: userError } = await supabase.auth.admin.listUsers();

	if (userError || !users) {
		console.log(userError);
		return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
	}

	// Find the user by email
	const user = users?.users.find((u) => u.email === email);

	// Check if the user exists
	if (!user) {
		return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
	}

	// Generate 6-digit OTP
	const lengthCode = 6;
	const otpCode = Array.from({ length: 6 }, () => randomInt(0, 10)).join('');

	// Store the OTP in a temporary database or session (Here, we assume there's an otp_codes table)
	const { error: insertError } = await supabase
		.from('otp_codes')
		.insert([{ email: email, otp: otpCode, created_at: new Date() }]);

	if (insertError) {
		console.log('Error inserting OTP:', insertError);
	} else {
		console.log('OTP successfully inserted for email:', email);
	}

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
