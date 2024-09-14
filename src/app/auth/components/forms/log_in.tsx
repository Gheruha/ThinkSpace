'use client';

import Link from 'next/link';
import { useButtonContext } from '@/app/product/components/clickedButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormItem, FormControl, FormMessage, FormField } from '@/components/ui/form';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'Email is required' })
		.regex(/^[^@]+@[^@]+\.[^@]+$/, { message: 'Must be a valid email' }),
	password: z.string().min(1, {
		message: 'Password is required'
	})
});

export function LoginForm() {
	const { setClickedButton } = useButtonContext();
	let [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const handleClick = (button: string) => {
		setClickedButton(button);
	};

	function togglePasswordVisibility(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		setShowPassword((showPassword = !showPassword));
	}

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const handleForgotPassword = async (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();

		// Validate the email field
		const isEmailValid = await form.trigger('email');
		if (isEmailValid) {
			const email = form.getValues('email');

			try {
				// Send the email to the backend handler to generate OTP
				const response = await fetch('/auth/components/routes/resetPassword', {
					method: 'POST',
					body: new URLSearchParams({ email })
				});

				if (response.ok) {
					// Redirect the user to the reset password page
					router.push(`/auth/resetPassword?email=${encodeURIComponent(email)}`);
				} else {
					console.error('Error sending OTP:', response);
				}
			} catch (error) {
				console.error('Error handling forgot password:', error);
			}
		}
	};

	return (
		<Form {...form}>
			<form action="/auth/components/routes/login" method="post">
				<Card className="mx-auto max-w-sm">
					<CardHeader>
						<CardTitle className="text-xl">Login</CardTitle>
						<CardDescription>Enter your email below to login to your account</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="grid gap-2">
										<Label>Email</Label>
										<FormControl>
											<Input id="email" type="email" placeholder="email@example.com" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem className="grid gap-2">
										<div className="flex items-center">
											<Label>Password</Label>
											<Link
												href="#"
												className="ml-auto inline-block text-sm underline"
												onClick={handleForgotPassword}
											>
												Forgot your password?
											</Link>
										</div>
										<div className="flex relative">
											<FormControl>
												<Input
													id="password"
													type={showPassword ? 'text' : 'password'}
													className="pr-10"
													placeholder="••••••••"
													{...field}
												/>
											</FormControl>
											<Button
												variant="icon"
												size="xs"
												onClick={togglePasswordVisibility}
												className="absolute right-0 py-5"
											>
												{showPassword ? <Eye size="20" /> : <EyeOff size="20" />}
											</Button>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full">
								Login
							</Button>
							<Button variant="outline" className="w-full">
								Login with Google
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Don&apos;t have an account?{' '}
							<Link href="/auth" className="underline" onClick={() => handleClick('Sign Up')}>
								Sign up
							</Link>
						</div>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
}
