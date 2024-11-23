import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		return NextResponse.json({
			message: 'Verify OTP successful.'
		});
	} catch (error) {
		return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
	}
}
