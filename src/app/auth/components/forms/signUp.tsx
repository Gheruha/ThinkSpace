'use client';

import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SignUpFormProps {
	switchForm: () => void;
}

export default function SignUpForm({ switchForm }: SignUpFormProps) {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		setShowPassword((prev) => !prev);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		// API call to sign up user
		const response = await fetch('/api/auth/signUp', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ firstName, lastName, email, password })
		});

		// Provide feedback after signup
		const result = await response.json();
		alert(result.message || 'Login successful!');
	};

	return (
		<form onSubmit={handleSubmit}>
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-xl">Sign Up</CardTitle>
					<CardDescription>Enter your information to create an account</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="first-name">First name</Label>
								<Input
									id="first-name"
									name="first-name"
									type="text"
									placeholder="Dorin"
									required
									value={firstName}
									onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="last-name">Last name</Label>
								<Input
									id="last-name"
									name="last-name"
									type="text"
									placeholder="Gheruha"
									required
									value={lastName}
									onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
								/>
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="email@example.com"
								required
								value={email}
								onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<div className="flex relative">
								<Input
									id="password"
									name="password"
									type={showPassword ? 'text' : 'password'}
									placeholder="••••••••••"
									required
									value={password}
									onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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
						<Link href="/auth" className="underline" onClick={switchForm}>
							Sign in
						</Link>
					</div>
				</CardContent>
			</Card>
		</form>
	);
}
