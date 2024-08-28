import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useButtonContext } from '../../product/components/clickedButton';
import { ChangeEventHandler, MouseEventHandler } from 'react';

interface SignUpFormProps {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	setFirstName: ChangeEventHandler<HTMLInputElement>;
	setLastName: ChangeEventHandler<HTMLInputElement>;
	setEmail: ChangeEventHandler<HTMLInputElement>;
	setPassword: ChangeEventHandler<HTMLInputElement>;
	signUp: MouseEventHandler<HTMLButtonElement>;
}

export function SignUpForm({
	firstName,
	lastName,
	email,
	password,
	setFirstName,
	setLastName,
	setEmail,
	setPassword,
	signUp
}: SignUpFormProps) {
	const { setClickedButton } = useButtonContext();
	const handleClick = (button: string) => {
		setClickedButton(button);
	};

	return (
		<form action="/auth/signup" method="post">
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
									placeholder="Dorin"
									required
									value={firstName}
									onChange={setFirstName}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="last-name">Last name</Label>
								<Input
									id="last-name"
									placeholder="Gheruha"
									required
									value={lastName}
									onChange={setLastName}
								/>
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" name="email" type="email" placeholder="m@example.com" required />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								placeholder="••••••••"
								required
							/>
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
						<Link href="/auth" className="underline" onClick={() => handleClick('Log In')}>
							Sign in
						</Link>
					</div>
				</CardContent>
			</Card>
		</form>
	);
}
