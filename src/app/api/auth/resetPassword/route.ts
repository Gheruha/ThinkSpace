import { NextRequest, NextResponse } from 'next/server';
import { resetUserPassword } from '@/lib/utils/auth/auth.utils';
import { ResetPasswordDto } from '@/types/auth.type';
import { isValidResetPasswordDto } from '@/lib/utils/auth/auth-validation';

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const body: unknown = await req.json();

		if (!isValidResetPasswordDto(body)) {
			return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
		}

		const { password }: ResetPasswordDto = body;
		await resetUserPassword({ password });

		return NextResponse.json({
			message: 'Reset Password successful!'
		});
	} catch (error: unknown) {
		console.error('Reset-password error:', error);
		const errorMessage = error instanceof Error ? error.message : 'Internal server error';
		return NextResponse.json({ message: errorMessage }, { status: 500 });
	}
}
