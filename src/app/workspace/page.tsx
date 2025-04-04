'use client';
import React from 'react';
import { useEffect, useMemo } from 'react';
import { useWorkspaceStore } from '@/lib/store/workspace/workspace.store';
import { WorkspaceService } from '@/lib/services/workspace/workspace.service';

export default function Workspace() {
	const pages = useWorkspaceStore((state) => state.pages);
	const setPages = useWorkspaceStore((state) => state.setPages);

	const workspaceService = useMemo(() => new WorkspaceService(), []);
	useEffect(() => {
		async function fetchAndStorePages() {
			try {
				const data = await workspaceService.getPagesService();
				setPages(data);
			} catch (err: any) {
				console.error('Error fetching pages: ', err);
			}
		}

		fetchAndStorePages();
	}, [setPages, workspaceService]);
	return (
		<div>
			<div className="flex justify-center pt-10"></div>
		</div>
	);
}
