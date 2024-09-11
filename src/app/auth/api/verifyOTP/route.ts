import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
	const cookieStore = cookies();
	const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

	const { otp } = await req.json();

	// Fetch user OTP (this is a sample flow, you should implement according to your OTP storage logic)
	const {
		data: { user },
		error
	} = await supabase.auth.getUser(); // Or get OTP from another source like database

	if (error || String(user?.user_metadata?.otp) !== String(otp)) {
		return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
	}

	const { data: userOtpData, error: otpError } = await supabase
		.from('otp_table')
		.select('otp')
		.eq('user_id', user?.id)
		.single();

	if (otpError || userOtpData?.otp !== otp) {
		return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
	}

	console.log('Received OTP:', otp);
	console.log('Stored OTP:', user?.user_metadata?.otp);

	// OTP verified successfully
	return NextResponse.json({ message: 'OTP verified successfully' }, { status: 200 });
}
