'use client';

import LearningProductLayout from '@/lib/layouts/marketing';

interface PricingLayoutProps {
	children: React.ReactNode;
}

export default function PricingLayout({ children }: PricingLayoutProps) {
	return <LearningProductLayout>{children}</LearningProductLayout>;
}
