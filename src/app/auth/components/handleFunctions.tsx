'use client';

import { toast } from '@/components/ui/use-toast';
import {
	ForgotPasswordDto,
	ResetPasswordDto,
	SignInDto,
	SignUpDto,
	VerifyOTPDto
} from '@/lib/dto/auth/auth.dto';
import { authService } from '@/lib/services/auth/auth.service';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';

export const useEmailFromLocalStorage = () => {
	const [email, setEmail] = useState<string>('');

	useEffect(() => {
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

	return email;
};

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
export const useHandleForgotPassword = () => {
	const router = useRouter();

	return async (forgotPasswordData: ForgotPasswordDto) => {
		try {
			const { message } = await authService.forgotPassword(forgotPasswordData);
			toast({ description: message, variant: 'default' });
			router.push('/auth/resetPassword?step=otp');
		} catch (error: any) {
			toast({ description: error.message, variant: 'destructive' });
		}
	};
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
export const useHandleVerifyOTP = () => {
	const router = useRouter();
	const email = useEmailFromLocalStorage();

	return async (verifyOTPData: VerifyOTPDto) => {
		try {
			const { message } = await authService.verifyOTP({ email, otpCode: verifyOTPData.otpCode });
			toast({ description: message, variant: 'default' });
			router.push('/auth/resetPassword?step=reset');
		} catch (error: any) {
			toast({ description: error.message, variant: 'destructive' });
		}
	};
};

export const useHandleResendOTP = () => {
	const email = useEmailFromLocalStorage();

	return async (e: React.MouseEvent<HTMLButtonElement>) => {
		try {
			e.preventDefault();
			const { message } = await authService.forgotPassword({ email });
			toast({ description: message, variant: 'default' });
		} catch (error: any) {
			toast({ description: error.message, variant: 'destructive' });
		}
	};
};

// passwordResetForm.tsx
export const useHandleResetPassword = () => {
	const router = useRouter();

	return async (passwordResetData: ResetPasswordDto) => {
		try {
			const { message } = await authService.resetPassword(passwordResetData);
			toast({ description: message, variant: 'default' });
			router.push('/workspace');
		} catch (error: any) {
			toast({ description: error.message, variant: 'destructive' });
		}
	};
};
