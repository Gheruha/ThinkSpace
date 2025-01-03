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
import { Check, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { authService } from '@/lib/services/auth/auth.service';
import { SignUpDto } from '@/lib/dto/auth/auth.dto';

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
	email: z.string().email('Invalid email format.'),
	password: z.string().min(8, 'Password must be at least 8 characters.')
});

export function SignUpForm() {
	const router = useRouter();
	const { toast } = useToast();
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<SignUpDto>({
		resolver: zodResolver(signUpSchema)
	});

	const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		setShowPassword((prev) => !prev);
	};

	const onSubmit: SubmitHandler<SignUpDto> = async (signInData) => {
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

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
