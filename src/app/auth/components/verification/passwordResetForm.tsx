'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { useHandleResetPassword } from '../handleFunctions';
import { usePasswordResetForm } from '../validationSchema';

export function PasswordResetForm() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
	const handleResetPassword = useHandleResetPassword();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = usePasswordResetForm();

	const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		setShowPassword((prev) => !prev);
	};

	const toggleConfirmPasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		setShowConfirmPassword((prev) => !prev);
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
