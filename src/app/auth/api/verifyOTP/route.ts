import { NextRequest, NextResponse } from 'next/server';
import { getRouteHandlerSupabaseClient } from '@/lib/supabaseClients';

export async function POST(req: NextRequest) {
	const supabase = getRouteHandlerSupabaseClient();

	const body = await req.json();
	const otp = String(body.otp);
	const email = body.email;

	console.log('Entered Email:', email);
	console.log('Entered OTP:', otp);

	// Fetch the session manually
	// const {
	// 	data: { session },
	// 	error: sessionError
	// } = await supabase.auth.getSession();
	// console.log('Session', session);
	// console.log('Session Error:', sessionError);

	// if (sessionError || !session) {
	// 	return NextResponse.json({ message: 'Auth session missing' }, { status: 400 });
	// }

	// Retrieve the user using the session
	// const { user } = session;
	// console.log(user);

	// Get the user from Supabase using session
	// const {
	// 	data: { user },
	// 	error
	// } = await supabase.auth.getUser();

	// console.log('Supabase user:', user);
	// console.log('Supabase error:', sessionError);

	// Handle missing user or session errors
	// if (error || !user) {
	// 	return NextResponse.json(
	// 		{ message: `Supabase error: ${error ? error.message : 'Auth session missing!'}` },
	// 		{ status: 400 }
	// 	);
	// }

	// Retrieve OTP from database
	const currentTime: any = new Date();
	const timeLimit = new Date(currentTime.getTime() - 5 * 60 * 1000).toISOString();
	console.log('Current Time:', currentTime);
	console.log('Time Limit for OTP:', timeLimit);

	const { data: otpData, error: otpError } = await supabase
		.from('otp_codes')
		.select('*')
		.eq('email', email)
		.eq('otp', otp);
	// .gte('created_at', timeLimit)
	// .maybeSingle();
	console.log('Data: ', otpData);

	// Log the raw data and any errors
	console.log('OTP Query Result:', otpData);
	console.log('OTP Query Error:', otpError);

	if (otpError || !otpData) {
		console.log('Entered OTP:', otp);
		console.log('No matching OTP found in the database.');
		return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
	}

	// console.log('Received OTP:', otp);
	// console.log('Stored OTP:', user?.user_metadata?.otp);

	// OTP verified successfully, now authenticate the user
	const { data: signInData, error: signInError } = await supabase.auth.signInWithOtp({
		email: email
		// otp: otp
	});

	if (signInError) {
		return NextResponse.json(
			{ message: `Sign-in failed: ${signInError.message}` },
			{ status: 400 }
		);
	}

	// OTP verified successfully
	return NextResponse.json({ message: 'OTP verified successfully' }, { status: 200 });
}
