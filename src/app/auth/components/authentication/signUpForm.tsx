'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signUpHandler } from '../handleFunctions';
import { useSignUpForm } from '../validationSchema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

export function SignUpForm() {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useSignUpForm();

	const handleTogglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsPasswordVisible((prev) => !prev);
	};

	return (
		<form onSubmit={handleSubmit(signUpHandler)}>
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
							{!errors.password ? (
								<p className="text-sm text-muted-foreground">
									Password must be at least 8 characters.
								</p>
							) : (
								<p className="text-red-500 text-sm">{errors.password.message}</p>
							)}
						</div>
						<Button type="submit" className="w-full">
							Create an account
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Already have an account?{' '}
						<Link href="/auth?mode=signIn" className="underline">
							Sign in
						</Link>
					</div>
				</CardContent>
			</Card>
		</form>
	);
}
