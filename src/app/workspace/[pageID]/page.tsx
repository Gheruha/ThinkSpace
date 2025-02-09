export default async function Page({ params }: { params: Promise<{ pageID: string }> }) {
	const { pageID } = await params;

	return (
		<div className="pl-10">
			<h1 className="text-3xl font-semibold">Page: {pageID}</h1>
		</div>
	);
}
