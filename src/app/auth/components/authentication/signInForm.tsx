'use client';

import { redirect, useRouter } from 'next/navigation';
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
import useAuthStore from '@/lib/state/auth/auth.state';
import { authService } from '@/lib/services/auth/auth.service';

// Validation schema
const signInSchema = z.object({
	email: z.string().email('Invalid email format.'),
	password: z.string().min(8, 'Password must be at least 8 characters.')
});

type SignInFormValues = z.infer<typeof signInSchema>;

export function SignInForm() {
	const router = useRouter();
	const { toast } = useToast();
	const setUser = useAuthStore((state) => state.setUser);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		trigger
	} = useForm<SignInFormValues>({
		resolver: zodResolver(signInSchema)
	});

	const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		setShowPassword((prev) => !prev);
	};

	const handleForgotPassword = async (): Promise<void> => {
		const email = getValues('email');
		if (!(await trigger('email'))) return;

		// setUser(email);
		router.push('/auth/resetPassword?step=otp');

		const response = await fetch('/api/auth/forgotPassword', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});

		const responseResult = await response.json();
		alert(responseResult.message || 'ResetPassword successful!');
	};

	const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
		try {
			const { user } = await authService.signIn(data);
			setUser(user);
			toast({ description: 'Sign in successful!' });
			router.push('/');
		} catch (error: any) {
			toast({
				description: error.message || 'Failed to sign in.',
				variant: 'destructive'
			});
		}
	};

	return (
		<form noValidate onSubmit={handleSubmit(onSubmit)}>
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-xl">Sign In</CardTitle>
					<CardDescription>Enter your email below to access your workspace</CardDescription>
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
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<Link
									href="#"
									className="ml-auto inline-block text-sm underline"
									onClick={handleForgotPassword}
								>
									Forgot your password?
								</Link>
							</div>
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
							{!errors.password ? (
								<p className="text-sm text-muted-foreground">
									Password must be at least 8 characters.
								</p>
							) : (
								<p className="text-red-500 text-sm">{errors.password.message}</p>
							)}
						</div>
						<Button type="submit" className="w-full">
							Access Your Workspace
						</Button>
						<Button variant="outline" className="w-full">
							Sign in with GitHub
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{' '}
						<Link href="/auth?mode=signUp" className="underline">
							Sign up
						</Link>
					</div>
				</CardContent>
			</Card>
		</form>
	);
}
