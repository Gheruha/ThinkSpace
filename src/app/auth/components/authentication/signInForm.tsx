'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSignInWithOtpHandler, signInHandler } from '../handleFunctions';
import { useSignInForm } from '../validationSchema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

export function SignInForm() {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const [isOtpMode, setIsOtpMode] = useState<boolean>(false);
	const signInWithOtpHandler = useSignInWithOtpHandler();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useSignInForm(isOtpMode);

	const handleTogglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsPasswordVisible((prev) => !prev);
	};

	const handleForgotPasswordClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		setIsOtpMode(true);
	};

	const handleBackToSignInClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		setIsOtpMode(false);
	};

	return (
		<form noValidate onSubmit={handleSubmit(isOtpMode ? signInWithOtpHandler : signInHandler)}>
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-xl">{isOtpMode ? 'Forgot Password' : 'Sign In'}</CardTitle>
					<CardDescription>
						{isOtpMode
							? 'Enter your email to reset your password'
							: 'Enter your email and password below to access your workspace'}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								{...register('email')}
								type="email"
								placeholder="email@example.com"
							/>
							{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
						</div>
						{!isOtpMode && (
							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<div className="flex relative">
									<Input
										id="password"
										{...register('password')}
										type={isPasswordVisible ? 'text' : 'password'}
										placeholder="••••••••••"
										className="pr-10"
									/>
									<Button
										variant="icon"
										size="xs"
										onClick={handleTogglePasswordVisibility}
										className="absolute right-0 py-5"
									>
										{isPasswordVisible ? <Eye size="20" /> : <EyeOff size="20" />}
									</Button>
								</div>
								{errors.password && (
									<p className="text-red-500 text-sm">{errors.password.message}</p>
								)}
							</div>
						)}
						<Button type="submit" className="w-full">
							{isOtpMode ? 'Reset Password' : 'Access Your Workspace'}
						</Button>
					</div>
					{!isOtpMode && (
						<div className="mt-4 text-center text-sm">
							Don&apos;t have an account?{' '}
							<Link href="/auth?mode=signUp" className="underline">
								Sign up
							</Link>
						</div>
					)}
				</CardContent>
			</Card>
			<div className="text-center mt-2 text-sm text-slate-500 hover:text-slate-400">
				<Link
					href="#"
					className="underline"
					onClick={isOtpMode ? handleBackToSignInClick : handleForgotPasswordClick}
				>
					{isOtpMode ? 'Back to Sign In' : 'Forgot your password?'}
				</Link>
			</div>
		</form>
	);
}
