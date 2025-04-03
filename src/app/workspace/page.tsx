'use client';
import React from 'react';
import { useEffect } from 'react';
import { useWorkspaceStore } from '@/lib/store/workspace/workspace.store';
import { WorkspaceService } from '@/lib/services/workspace/workspace.service';

export default function Workspace() {
	const { pages, setPages, pagesCount } = useWorkspaceStore();
	const workspaceService = new WorkspaceService();
	useEffect(() => {
		async function fetchAndStorePages() {
			try {
				const data = await workspaceService.getPagesService();
			} catch (err: any) {
				console.error('Error fetching pages:', err);
			}
		}

		fetchAndStorePages();
	}, [pages, setPages, pagesCount]);

	return (
		<div>
			<div className="flex justify-center pt-10"></div>
		</div>
	);
}
