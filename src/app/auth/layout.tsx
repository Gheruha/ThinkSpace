'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
	children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	const router = useRouter();

	return (
		<div className="relative min-h-screen flex items-center">
			<div className="absolute left-4 top-4">
				<Button
					onClick={() => router.push('/')}
					variant="link"
					className="hover:no-underline space-x-1"
				>
					<ArrowLeft size={15} />
					<p>Back</p>
				</Button>
			</div>
			<div className="mx-auto">{children}</div>
		</div>
	);
}
