'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordDto, SignInDto, SignUpDto, VerifyOTPDto } from '@/lib/dto/auth/auth.dto';

// Schemas
const emailSchema = z.string().email('Invalid email format.');
const passwordSchema = z.string().min(8, 'Password must be at least 8 characters.');
const nameSchema = z
	.string()
	.regex(/^[A-Za-z]+$/, 'Must contain only letters.')
	.min(2, 'Required.');

export const authSchemas = {
	signIn: z.object({
		email: emailSchema,
		password: passwordSchema
	}),
	signUp: z.object({
		firstName: nameSchema,
		lastName: nameSchema,
		email: emailSchema,
		password: passwordSchema
	}),
	forgotPassword: z.object({
		email: emailSchema
	}),
	otpVerification: z.object({
		otp: z
			.string()
			.length(6, 'OTP must be exactly 6 digits.')
			.regex(/^\d+$/, 'OTP must contain only numbers.')
	}),
	passwordReset: z
		.object({
			password: passwordSchema,
			confirmPassword: z.string()
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "Passwords don't match.",
			path: ['confirmPassword']
		})
};

// signInForm.tsx
export function useSignInForm(isForgotPassword: boolean) {
	const form = useForm<SignInDto>({
		resolver: zodResolver(isForgotPassword ? authSchemas.forgotPassword : authSchemas.signIn)
	});

	return {
		...form
	};
}

// signUpForm.tsx
export function useSignUpForm() {
	return useForm<SignUpDto>({
		resolver: zodResolver(authSchemas.signUp)
	});
}

// OTPVerification.tsx
export function useOTPForm() {
	return useForm<VerifyOTPDto>({
		resolver: zodResolver(authSchemas.otpVerification),
		defaultValues: { otpCode: '' }
	});
}

// passwordResetForm.tsx;
export function usePasswordResetForm() {
	return useForm<ResetPasswordDto>({
		resolver: zodResolver(authSchemas.passwordReset)
	});
}
