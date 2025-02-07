import { ResetPasswordDto } from '@/lib/dto/auth/auth.dto';
import { resetUserPassword } from '@/lib/utils/auth/auth.util';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const { password }: ResetPasswordDto = await req.json();

		await resetUserPassword({ password });

		return NextResponse.json({
			message: 'Reset Password successful.'
		});
	} catch (error) {
		return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
	}
}
