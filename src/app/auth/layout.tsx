'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
	children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	const router = useRouter();

	const handleGoBack = () => {
		router.push('/product');
	};

	return (
		<div className="relative flex min-h-screen items-center">
			<div className="absolute left-4 top-4">
				<Button
					onClick={handleGoBack}
					variant="link"
					className="flex items-center gap-1 hover:no-underline"
				>
					<ArrowLeft size={15} />
					<p>Back</p>
				</Button>
			</div>
			<main className="mx-auto">{children}</main>
			<Toaster />
		</div>
	);
}
