'use client';

import { toast } from '@/components/ui/use-toast';
import { ForgotPasswordDto, SignInDto, SignUpDto } from '@/lib/dto/auth/auth.dto';
import { authService } from '@/lib/services/auth/auth.service';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { OTPFormData } from './verification/OTPVerification';
import { useEffect, useState } from 'react';
import { PasswordResetFormValues } from './verification/passwordResetForm';

// OAuth.tsx
export const handleSignInWithOAuth = async (): Promise<void> => {
	try {
		const { message } = await authService.signInWithOAuth();
		toast({ description: message, variant: 'default' });
	} catch (error: any) {
		toast({
			description: error.message,
			variant: 'destructive'
		});
	}
};

// signInForm.tsx
export const handleForgotPassword: SubmitHandler<ForgotPasswordDto> = async (
	forgotPasswordData
) => {
	try {
		const router = useRouter();
		const { message } = await authService.forgotPassword(forgotPasswordData);
		toast({ description: message, variant: 'default' });
		router.push('/auth/resetPassword?step=otp');
	} catch (error: any) {
		toast({
			description: error.message,
			variant: 'destructive'
		});
	}
};

export const handleSignIn: SubmitHandler<SignInDto> = async (signInData) => {
	try {
		const { message } = await authService.signIn(signInData);
		toast({ description: message, variant: 'default' });
	} catch (error: any) {
		toast({
			description: error.message,
			variant: 'destructive'
		});
	}
};

// signUpForm.tsx
export const handleSignUp: SubmitHandler<SignUpDto> = async (signInData) => {
	try {
		const { message } = await authService.signUp(signInData);
		toast({
			description: (
				<div className="flex items-center">
					<Check className="mr-2 text-[hsl(var(--foreground))]" />
					<span>{message}</span>
				</div>
			),
			variant: 'default'
		});
	} catch (error: any) {
		toast({
			description: error.message,
			variant: 'destructive'
		});
	}
};

// OTPVerification.tsx
const [email, setEmail] = useState<string>('');

useEffect(() => {
	// Retrieve user data from localStorage
	const storedUserData = localStorage.getItem('userData');
	if (storedUserData) {
		try {
			const parsedUser = JSON.parse(storedUserData);
			setEmail(parsedUser.email || '');
		} catch (error) {
			console.error('Error parsing userData from localStorage:', error);
		}
	}
}, []);

export const handleVerifyOTP: SubmitHandler<OTPFormData> = async (verifyOTPData) => {
	try {
		const router = useRouter();
		const otpCode = verifyOTPData.otp;
		const { message } = await authService.verifyOTP({ email, otpCode });
		toast({ description: message, variant: 'default' });
		router.push('/auth/resetPassword?step=reset');
	} catch (error: any) {
		toast({
			description: error.message,
			variant: 'destructive'
		});
	}
};

export const handleResendOTP = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
	try {
		e.preventDefault();
		const { message } = await authService.forgotPassword({ email });
		toast({ description: message, variant: 'default' });
	} catch (error: any) {
		toast({
			description: error.message,
			variant: 'destructive'
		});
	}
};

// passwordResetForm.tsx
export const handleResetPassword: SubmitHandler<PasswordResetFormValues> = async (
	passwordResetData
) => {
	try {
		const router = useRouter();
		const { message } = await authService.resetPassword(passwordResetData);
		toast({ description: message, variant: 'default' });
		router.push('/workspace');
	} catch (error: any) {
		toast({
			description: error.message,
			variant: 'destructive'
		});
	}
};
