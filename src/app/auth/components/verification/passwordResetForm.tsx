'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { authService } from '@/lib/services/auth/auth.service';
import { toast } from '@/components/ui/use-toast';

const passwordResetSchema = z
	.object({
		password: z.string().min(8, 'Password must be at least 8 characters.'),
		confirmPassword: z.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match.",
		path: ['confirmPassword']
	});

type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;

export function PasswordResetForm() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<PasswordResetFormValues>({
		resolver: zodResolver(passwordResetSchema)
	});

	const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		setShowPassword((prev) => !prev);
	};

	const toggleConfirmPasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		setShowConfirmPassword((prev) => !prev);
	};

	const handleResetPassword: SubmitHandler<PasswordResetFormValues> = async (passwordResetData) => {
		try {
			const { message } = await authService.resetPassword(passwordResetData);
			toast({ description: message, variant: 'default' });
			router.push('/workspace');
		} catch (error: any) {
			toast({
				description: error.message,
				variant: 'destructive'
			});
		}
	};

	return (
		<form noValidate onSubmit={handleSubmit(handleResetPassword)}>
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-xl">Reset Password</CardTitle>
					<CardDescription>Enter a new password to change the older one</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<div className="flex relative">
								<Input
									id="password"
									{...register('password')}
									type={showPassword ? 'text' : 'password'}
									placeholder="••••••••"
									className="pr-10"
									required
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
							{errors.password ? (
								<p className="text-red-500 text-sm">{errors.password.message}</p>
							) : (
								<p className="text-sm text-muted-foreground">
									Password must be at least 8 characters.
								</p>
							)}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="confirmPassword">Confirm your Password</Label>
							<div className="flex relative">
								<Input
									id="confirmPassword"
									{...register('confirmPassword')}
									type={showConfirmPassword ? 'text' : 'password'}
									className="pr-10"
									placeholder="••••••••"
									required
								/>
								<Button
									variant="icon"
									size="xs"
									onClick={toggleConfirmPasswordVisibility}
									className="absolute right-0 py-5"
								>
									{showConfirmPassword ? <Eye size="20" /> : <EyeOff size="20" />}
								</Button>
							</div>
							{errors.confirmPassword && (
								<p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
							)}
						</div>
						<Button type="submit" className="w-full">
							Create new password
						</Button>
					</div>
				</CardContent>
			</Card>
		</form>
	);
}
