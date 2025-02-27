'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { WorkspaceService } from '@/lib/services/workspace/workspace.service';

export default function NewPageForm() {
	// Variables
	const [title, setTitle] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [result, setResult] = useState(null);

	// Handle Submit function
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		setError('');
		setResult(null);

		try {
			const workspaceService = new WorkspaceService();

			const response = await workspaceService.newPage({ title });
			setResult(response);
			setTitle(''); // clear the title for future ones
		} catch (err: any) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-xl">New Page</CardTitle>
					<CardDescription>Complete the fields in order to create a new page.</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="Title">Page Title:</Label>
							<Input
								name="Title"
								placeholder="Basic page"
								onChange={(e) => setTitle(e.target.value)}
							></Input>
						</div>
						<div className="grid gap-2">
							<Button type="submit" disabled={loading}>
								Create
							</Button>
						</div>
						{error && <p className="text-red-500">{error}</p>}
						{result && <p className="text-green-500">Page created successfully!</p>}
					</div>
				</CardContent>
			</Card>
		</form>
	);
}
