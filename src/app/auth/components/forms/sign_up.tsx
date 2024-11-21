'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { useButtonContext } from '@/app/product/components/clickedButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useBlurContext } from '../blur';

export function SignUpForm() {
	const { toast } = useToast();
	let [showPassword, setShowPassword] = useState(false);

	const { setClickedButton } = useButtonContext();
	const { isBlur, triggerBlur } = useBlurContext();

	const handleClick = (button: string) => {
		setClickedButton(button);
	};

	function togglePasswordVisibility(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		setShowPassword((showPassword = !showPassword));
	}

	// Retrieve the isUser cookie value
	useEffect(() => {
		const isMail = document.cookie
			.split('; ')
			.find((row) => row.startsWith('isMail='))
			?.split('=')[1];
		const isSignedUp = document.cookie
			.split('; ')
			.find((row) => row.startsWith('isSignedUp='))
			?.split('=')[1];

		// Show toast if isUser is true
		if (isMail === 'true') {
			toast({
				description: 'Check your email for confirmation',
				duration: 60000
			});

			triggerBlur();
			document.cookie = 'isMail=; Max-Age=0; path=/';

			// Retrieve the isSignedUp cookie value
		} else if (isSignedUp === 'true') {
			toast({
				description: (
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Check style={{ marginRight: '8px', color: 'hsl(var(--primary))' }} />
						<span>Already signed up, you must sign in.</span>
					</div>
				),
				duration: 60000
			});
			document.cookie = 'isSignedUp=; Max-Age=0; path=/';
		}
	}, [toast, triggerBlur]);

	return (
		<form
			action="/auth/components/routes/signup"
			method="post"
			className={isBlur ? 'blur-lg pointer-events-none' : ''}
		>
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
								<Input id="first-name" name="first-name" placeholder="Dorin" />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="last-name">Last name</Label>
								<Input id="last-name" name="last-name" placeholder="Gheruha" />
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" name="email" type="email" placeholder="m@example.com" required />
						</div>
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
						<Button type="submit" className="w-full">
							Create an account
						</Button>
						<Button
							variant="outline"
							className="w-full"
							onClick={() => (window.location.href = '/auth/components/routes/googleOAuth')}
						>
							Sign up with Google
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Already have an account?{' '}
						<Link href="/auth" className="underline" onClick={() => handleClick('Log In')}>
							Sign in
						</Link>
					</div>
				</CardContent>
			</Card>
		</form>
	);
}
