'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { authService } from '@/lib/services/auth/auth.service';
import { SignInDto, ForgotPasswordDto } from '@/lib/dto/auth/auth.dto';

// Validation schema
const signInSchema = z.object({
	email: z.string().email('Invalid email format.'),
	password: z.string().min(8, 'Password must be at least 8 characters.')
});

const forgotPasswordSchema = z.object({
	email: z.string().email('Invalid email format.')
});

export function SignInForm() {
	const router = useRouter();
	const { toast } = useToast();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isForgotPassword, setIsForgotPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<SignInDto>({
		resolver: zodResolver(isForgotPassword ? forgotPasswordSchema : signInSchema)
	});

	const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		setShowPassword((prev) => !prev);
	};

	const handleForgotPassword: SubmitHandler<ForgotPasswordDto> = async (forgotPasswordData) => {
		try {
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

	const handleSignIn: SubmitHandler<SignInDto> = async (signInData) => {
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

	return (
		<form
			noValidate
			onSubmit={handleSubmit(isForgotPassword ? handleForgotPassword : handleSignIn)}
		>
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-xl">
						{isForgotPassword ? 'Forgot Password' : 'Sign In'}
					</CardTitle>
					<CardDescription>
						{isForgotPassword
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
						{!isForgotPassword && (
							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<div className="flex relative">
									<Input
										id="password"
										{...register('password')}
										type={showPassword ? 'text' : 'password'}
										placeholder="••••••••••"
										className="pr-10"
									/>
									<Button
										variant="icon"
										size="xs"
										onClick={togglePasswordVisibility}
										className="absolute right-0 py-5"
									>
										{showPassword ? <Eye size="20" /> : <EyeOff size="20" />}
									</Button>
								</div>
								{errors.password && (
									<p className="text-red-500 text-sm">{errors.password.message}</p>
								)}
							</div>
						)}
						<Button type="submit" className="w-full">
							{isForgotPassword ? 'Reset Password' : 'Access Your Workspace'}
						</Button>
					</div>
					{!isForgotPassword && (
						<div className="mt-4 text-center text-sm">
							Don&apos;t have an account?{' '}
							<Link href="/auth?mode=signUp" className="underline">
								Sign up
							</Link>
						</div>
					)}
				</CardContent>
			</Card>
			{!isForgotPassword && (
				<div className="text-center mt-2 text-sm text-slate-500 hover:text-slate-400">
					<Link
						href="_"
						className="underline"
						onClick={(e) => {
							e.preventDefault();
							setIsForgotPassword(true);
						}}
					>
						Forgot your password?
					</Link>
				</div>
			)}
			{isForgotPassword && (
				<div className="text-center mt-2 text-sm text-slate-500 hover:text-slate-400">
					<Link
						href="_"
						className="underline"
						onClick={(e) => {
							e.preventDefault();
							setIsForgotPassword(false);
						}}
					>
						Back to Sign In
					</Link>
				</div>
			)}
		</form>
	);
}
