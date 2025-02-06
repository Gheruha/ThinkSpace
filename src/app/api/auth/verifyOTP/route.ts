import { NextRequest, NextResponse } from 'next/server';
import { verifyUserOtp } from '@/lib/utils/auth/auth.util';
import { VerifyOTPDto } from '@/lib/dto/auth/auth.dto';

export async function POST(req: NextRequest) {
	try {
		const { email, otpCode }: VerifyOTPDto = await req.json();

		await verifyUserOtp({ email, otpCode });

		return NextResponse.json({
			message: 'Verify OTP successful.'
		});
	} catch (error) {
		return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
	}
}
