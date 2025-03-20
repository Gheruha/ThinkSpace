'use client';

import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SignInDto, SignUpDto, VerifyOtpDto, ResetPasswordDto } from '@/types/auth.type';

// Base schemas
const emailSchema = z.string().email('Invalid email format.');
const passwordSchema = z.string().min(8, 'Password must be at least 8 characters.');
const nameSchema = z
	.string()
	.regex(/^[A-Za-z\s]+$/, 'Must contain only letters.')
	.min(2, 'Required.');

// Authentication Schemas
export const signInSchema = z.object({
	email: emailSchema,
	password: passwordSchema
});

export const signUpSchema = z.object({
	firstName: nameSchema,
	lastName: nameSchema,
	email: emailSchema,
	password: passwordSchema
});

export const signInWithOtpSchema = z.object({
	email: emailSchema
});

export const otpVerificationSchema = z.object({
	otpCode: z
		.string()
		.length(6, 'OTP must be exactly 6 digits.')
		.regex(/^\d+$/, 'OTP must contain only numbers.')
});

export const passwordResetSchema = z
	.object({
		password: passwordSchema,
		confirmPassword: z.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match.",
		path: ['confirmPassword']
	});

// Sign In Form Hook
export function useSignInForm(isOtpMode: boolean): UseFormReturn<SignInDto> {
	return useForm<SignInDto>({
		resolver: zodResolver(isOtpMode ? signInWithOtpSchema : signInSchema)
	});
}

// Sign Up Form Hook
export function useSignUpForm(): UseFormReturn<SignUpDto> {
	return useForm<SignUpDto>({
		resolver: zodResolver(signUpSchema),
		defaultValues: { firstName: '', lastName: '', email: '', password: '' }
	});
}

// OTP Verification Form Hook
export function useOTPForm(): UseFormReturn<VerifyOtpDto> {
	return useForm<VerifyOtpDto>({
		resolver: zodResolver(otpVerificationSchema),
		defaultValues: { otpCode: '' }
	});
}

// Password Reset Form Hook
export function usePasswordResetForm(): UseFormReturn<ResetPasswordDto> {
	return useForm<ResetPasswordDto>({
		resolver: zodResolver(passwordResetSchema),
		defaultValues: { password: '', confirmPassword: '' }
	});
}
