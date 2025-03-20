'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronsRight } from 'lucide-react';
import { Ellipsis } from 'lucide-react';
import { useMenuStore } from '@/lib/store/workspace/menu.store';

export default function WorkspaceHeader() {
	const { isMenuOpen, toggleMenu } = useMenuStore();

	return (
		<header className={`flex h-8 w-full ${isMenuOpen ? 'justify-end' : 'justify-between'}`}>
			<Button
				variant="icon"
				size="xs"
				className={`px-2 ${isMenuOpen ? 'hidden' : ''}`}
				onClick={toggleMenu}
			>
				<ChevronsRight />
			</Button>
			<Button variant="icon" size="xs" className="px-2">
				<Ellipsis />
			</Button>
		</header>
	);
}
