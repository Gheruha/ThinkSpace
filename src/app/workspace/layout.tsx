'use client';

import WorkspaceLayout from '@/lib/layouts/workspace';
import { ThemeIcon } from '@/components/theme-icon';
import { Home } from 'lucide-react';

export default function ProductLayout({ children }: { children: React.ReactNode }) {
	return (
		<WorkspaceLayout>
			<ThemeIcon icon={Home} />
			{children}
		</WorkspaceLayout>
	);
}
