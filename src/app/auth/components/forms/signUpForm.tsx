'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Validation schema
const signUpSchema = z.object({
	firstName: z
		.string()
		.regex(/^[A-Za-z]+$/, 'First name must contain only letters.')
		.min(2, 'First name is required.'),
	lastName: z
		.string()
		.regex(/^[A-Za-z]+$/, 'Last name must contain only letters.')
		.min(2, 'Last name is required.'),
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
type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<SignUpFormValues>({
		resolver: zodResolver(signUpSchema)
	});

	const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		setShowPassword((prev) => !prev);
	};

	const switchToSignIn = (e: React.MouseEvent<HTMLAnchorElement>): void => {
		e.preventDefault();
		router.push('/auth?mode=signIn');
	};

	const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
		const response = await fetch('/api/auth/signUp', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});

		const result = await response.json();
		alert(result.message || 'SignUp successful!');
	};

	return (
		<form noValidate onSubmit={handleSubmit(onSubmit)}>
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-xl">Sign Up</CardTitle>
					<CardDescription>Enter your information to create an account</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid grid-cols-2 gap-4 items-start">
							<div className="grid gap-2">
								<Label htmlFor="first-name">First name</Label>
								<Input id="first-name" {...register('firstName')} type="text" placeholder="Dorin" />
								{errors.firstName && (
									<p className="text-red-500 text-sm">{errors.firstName.message}</p>
								)}
							</div>
							<div className="grid gap-2">
								<Label htmlFor="last-name">Last name</Label>
								<Input id="last-name" {...register('lastName')} type="text" placeholder="Gheruha" />
								{errors.lastName && (
									<p className="text-red-500 text-sm">{errors.lastName.message}</p>
								)}
							</div>
						</div>
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
							Create an account
						</Button>
						<Button variant="outline" className="w-full">
							Sign up with GitHub
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Already have an account?{' '}
						<Link href="/auth" className="underline" onClick={switchToSignIn}>
							Sign in
						</Link>
					</div>
				</CardContent>
			</Card>
		</form>
	);
}