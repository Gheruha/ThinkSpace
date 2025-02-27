'use client';

import { useState } from 'react';
import { useResetPasswordHandler } from '../handleFunctions';
import { usePasswordResetForm } from '../validationSchema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

export function PasswordResetForm() {
	const [passwordVisibility, setPasswordVisibility] = useState({
		password: false,
		confirmPassword: false
	});
	const resetPasswordHandler = useResetPasswordHandler();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = usePasswordResetForm();

	const handleToggleVisibility = (
		e: React.MouseEvent<HTMLButtonElement>,
		field: 'password' | 'confirmPassword'
	) => {
		e.preventDefault();
		setPasswordVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
	};

	return (
		<form noValidate onSubmit={handleSubmit(resetPasswordHandler)}>
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
									type={passwordVisibility.password ? 'text' : 'password'}
									placeholder="••••••••"
									className="pr-10"
									required
								/>
								<Button
									variant="icon"
									size="xs"
									onClick={(e) => handleToggleVisibility(e, 'password')}
									className="absolute right-2 top-1/2 transform -translate-y-1/2"
								>
									{passwordVisibility.password ? <Eye size="20" /> : <EyeOff size="20" />}
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
									type={passwordVisibility.confirmPassword ? 'text' : 'password'}
									className="pr-10"
									placeholder="••••••••"
									required
								/>
								<Button
									variant="icon"
									size="xs"
									onClick={(e) => handleToggleVisibility(e, 'confirmPassword')}
									className="absolute right-0 py-5"
								>
									{passwordVisibility.confirmPassword ? <Eye size="20" /> : <EyeOff size="20" />}
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
