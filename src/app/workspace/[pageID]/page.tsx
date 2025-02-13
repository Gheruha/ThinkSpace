import { Button } from '@/components/ui/button';

export default async function Page({ params }: { params: Promise<{ pageID: string }> }) {
	const { pageID } = await params;

	return (
		<div className="flex space-y-20">
			<div className="w-full h-full fixed flex justify-start">
				<form action="/api/workspace/newPage" method="POST">
					<Button variant="outline">+ New Page</Button>
				</form>
			</div>
			<h1 className="text-3xl font-semibold">Page: {pageID}</h1>
		</div>
	);
}
