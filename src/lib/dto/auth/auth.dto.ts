export interface signInDto {
	email: string;
	password: string;
}

export interface signUpDto {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	redirectUrl: string;
}

export interface forgotPasswordDto {
	email: string;
}

export interface verifyOTPDto {
	email: string;
	otp: string;
}

export interface resetPasswordDto {
	password: string;
	confirmPassword: string;
}

export interface resendOTPDto {
	email: string;
}

export interface User {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
}
