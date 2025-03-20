import {
	SignInDto,
	SignUpDto,
	SignInWithOtpDto,
	VerifyOtpDto,
	ResetPasswordDto
} from '@/types/auth.type';

// Validate if the body conforms to the SignInDto structure
export function isValidSignInDto(body: unknown): body is SignInDto {
	if (typeof body !== 'object' || body === null) return false;
	const { email, password } = body as Record<string, unknown>;
	return typeof email === 'string' && typeof password === 'string';
}

// Validate if the body conforms to the SignUpDto structure
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

// Validate if the body conforms to the SignInWithOtpDto structure
export function isValidSignInWithOtpDto(body: unknown): body is SignInWithOtpDto {
	if (typeof body !== 'object' || body === null) return false;
	const { email } = body as Record<string, unknown>;
	return typeof email === 'string';
}

// Validate if the body conforms to the VerifyOtpDto structure
export function isValidVerifyOtpDto(body: unknown): body is VerifyOtpDto {
	if (typeof body !== 'object' || body === null) return false;
	const { email, otpCode } = body as Record<string, unknown>;
	return typeof email === 'string' && typeof otpCode === 'string';
}

// Validate if the body conforms to the ResendPasswordDto structure
export function isValidResetPasswordDto(body: unknown): body is ResetPasswordDto {
	if (typeof body !== 'object' || body === null) return false;
	const { password } = body as Record<string, unknown>;
	return typeof password === 'string';
}
