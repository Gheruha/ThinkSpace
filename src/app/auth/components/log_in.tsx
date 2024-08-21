import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useButtonContext } from '../../product/components/clickedButton';
import { ChangeEventHandler, MouseEventHandler } from 'react';

interface LogInFormProps {
	email: string;
	password: string;
	setEmail: ChangeEventHandler<HTMLInputElement>;
	setPassword: ChangeEventHandler<HTMLInputElement>;
	logIn: MouseEventHandler<HTMLButtonElement>;
}

export function LoginForm({ email, password, setEmail, setPassword, logIn }: LogInFormProps) {
	const { setClickedButton } = useButtonContext();
	const handleClick = (button: string) => {
		setClickedButton(button);
	};

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-xl">Login</CardTitle>
				<CardDescription>Enter your email below to login to your account</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							required
							value={email}
							onChange={setEmail}
						/>
					</div>
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							<Link href="#" className="ml-auto inline-block text-sm underline">
								Forgot your password?
							</Link>
						</div>
						<Input
							id="password"
							type="password"
							placeholder="••••••••"
							required
							value={password}
							onChange={setPassword}
						/>
					</div>
					<Button type="submit" className="w-full" onClick={logIn}>
						Login
					</Button>
					<Button variant="outline" className="w-full">
						Login with Google
					</Button>
				</div>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{' '}
					<Link href="#" className="underline" onClick={() => handleClick('Sign Up')}>
						Sign up
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
