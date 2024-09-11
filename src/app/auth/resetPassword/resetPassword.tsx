'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';

export function ResetPassword() {
	let [showPassword, setShowPassword] = useState(false);
	let [showConfirmPassword, setShowConfirmPassword] = useState(false);

	function togglePasswordVisibility(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		setShowPassword((showPassword = !showPassword));
	}

	function toggleConfirmPasswordVisibility(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		setShowConfirmPassword((showConfirmPassword = !showConfirmPassword));
	}
	return (
		<form action="/auth/components/routes/resetPassword" method="post">
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
									name="password"
									type={showPassword ? 'text' : 'password'}
									className="pr-10"
									placeholder="••••••••"
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
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Confirm your Password</Label>
							<div className="flex relative">
								<Input
									id="password"
									name="password"
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
