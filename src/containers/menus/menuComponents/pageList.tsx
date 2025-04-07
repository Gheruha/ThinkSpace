import React from 'react';
import { useWorkspaceStore } from '@/lib/store/workspace/workspace.store';

export default function PageList() {
	const pages = useWorkspaceStore((state) => state.pages);

	return (
		<div>
			{pages && pages.length > 0 ? (
				pages.map((page) => <li key={page.id}>{page.Title}</li>)
			) : (
				<p>There are no pages.</p>
			)}
		</div>
	);
}
