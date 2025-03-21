import NewPageForm from '@/app/workspace/components/workspaceForms/newPageForm';

export default async function Page({ params }: { params: Promise<{ pageID: string }> }) {
	const { pageID } = await params;

	return (
		<div className="flex space-y-20">
			<div className="w-full h-full fixed flex justify-center items-center">
				<NewPageForm />
			</div>
			<h1 className="text-3xl font-semibold">Page: {pageID}</h1>
		</div>
	);
}
