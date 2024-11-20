'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useAuthStore from '@/lib/stores/authStore';

// Validation schema
const signInSchema = z.object({
	email: z
		.string()
		.email('Invalid email format.')
		.regex(/^[^@]+@[^@]+\.[^@]+$/, 'Invalid email address.'),
	password: z
		.string()
		.min(12, 'Password must be at least 12 characters.')
		.regex(/[A-Z]/, 'Password must include at least one uppercase letter.')
		.regex(/\d/, 'Password must include at least one number.')
});

// Component props
type SignInFormValues = z.infer<typeof signInSchema>;

export function SignInForm() {
	const router = useRouter();
	const setEmail = useAuthStore((state) => state.setEmail);
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

	const switchToSignUp = (e: React.MouseEvent<HTMLAnchorElement>): void => {
		e.preventDefault();
		router.push('/auth?mode=signUp');
	};

	const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
		const response = await fetch('/api/auth/signIn', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});

		const result = await response.json();
		alert(result.message || 'SignIn successful!');
	};

	const handleForgotPassword = async (e: React.MouseEvent<HTMLAnchorElement>): Promise<void> => {
		e.preventDefault();
		const email = getValues('email');
		const result = await trigger('email');

		if (!result) {
			return;
		}

		setEmail(email);
		router.push('/auth/resetPassword?step=otp');

		const response = await fetch('/api/auth/resetPassword', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});

		const responseResult = await response.json();
		alert(responseResult.message || 'ResetPassword successful!');
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
									Password must be at least 12 characters and include at least one uppercase letter
									and one number.
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
						<Link href="/auth" className="underline" onClick={switchToSignUp}>
							Sign up
						</Link>
					</div>
				</CardContent>
			</Card>
		</form>
	);
}
