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

export interface SignInWithOtpDto {
	email: string;
}

export interface VerifyOtpDto {
	email?: string;
	otpCode: string;
}

export interface ResetPasswordDto {
	password: string;
	confirmPassword?: string;
}
