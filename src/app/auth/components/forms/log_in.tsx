import Link from 'next/link';

import { useButtonContext } from '@/app/product/components/clickedButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

export function LoginForm() {
	const { setClickedButton } = useButtonContext();
	const handleClick = (button: string) => {
		setClickedButton(button);
	};

	const { toast } = useToast();

	return (
		<form action="/auth/components/routes/login" method="post">
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-xl">Login</CardTitle>
					<CardDescription>Enter your email below to login to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" name="email" type="email" placeholder="m@example.com" required />
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
								name="password"
								type="password"
								placeholder="••••••••"
								required
							/>
						</div>
						<Button
							type="submit"
							className="w-full"
							onClick={() => {
								toast({
									description: 'Your message has been sent.'
								});
							}}
						>
							Create an account
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
	);
}
