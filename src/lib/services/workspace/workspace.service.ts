import { PageDto } from '@/lib/dto/workspace/workspace.dto';
export class WorkspaceService {
	async newPage(newPageData: PageDto) {
		try {
			const response = await fetch('/api/workspace/newPage', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newPageData)
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || 'Failed to make a new Page');
			}

			return response.json();
		} catch (error: any) {
			console.error('Error in making a new page', error.message);
			throw error;
		}
	}

	async getPagesService(): Promise<any> {
		try {
			const response = await fetch('/api/workspace/getPages', {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || 'Failed to make a new Page');
			}

			return response.json();
		} catch (error: any) {
			console.error('Error in getting the pages', error.message);
			throw error;
		}
	}
}
