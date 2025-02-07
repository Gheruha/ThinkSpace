export interface SignInDto {
	email: string;
	password: string;
}

export interface SignUpDto {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	redirectUrl?: string;
}

export interface ForgotPasswordDto {
	email: string;
}

export interface VerifyOTPDto {
	email?: string;
	otpCode: string;
}

export interface ResetPasswordDto {
	password: string;
}

export interface ResendOTPDto {
	email: string;
}

export interface User {
	id: string;
	email?: string;
	firstName?: string;
	lastName?: string;
}
