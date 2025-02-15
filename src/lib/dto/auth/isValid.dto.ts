import { SignInWithOtpDto, SignInDto, SignUpDto, VerifyOTPDto, ResetPasswordDto } from './auth.dto';

export function isValidSignInDto(body: unknown): body is SignInDto {
	if (typeof body !== 'object' || body === null) return false;
	const { email, password } = body as Record<string, unknown>;
	return typeof email === 'string' && typeof password === 'string';
}

export function isValidSignUpDto(body: unknown): body is SignUpDto {
	if (typeof body !== 'object' || body === null) return false;
	const { firstName, lastName, email, password } = body as Record<string, unknown>;
	return (
		typeof firstName === 'string' &&
		typeof lastName === 'string' &&
		typeof email === 'string' &&
		typeof password === 'string'
	);
}

export function isValidSignInWithOtpDto(body: unknown): body is SignInWithOtpDto {
	if (typeof body !== 'object' || body === null) return false;
	const { email } = body as Record<string, unknown>;
	return typeof email === 'string';
}

export function isValidVerifyOtpDto(body: unknown): body is VerifyOTPDto {
	if (typeof body !== 'object' || body === null) return false;
	const { email, otpCode } = body as Record<string, unknown>;
	return typeof email === 'string' && typeof otpCode === 'string';
}

export function isValidResetPasswordDto(body: unknown): body is ResetPasswordDto {
	if (typeof body !== 'object' || body === null) return false;
	const { password } = body as Record<string, unknown>;
	return typeof password === 'string';
}
