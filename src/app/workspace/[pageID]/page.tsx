import { PageProps } from '@/lib/dto/workspace/workspace.dto';
const Page = async ({ params }: PageProps) => {
	const { pageID } = await params;
	return (
		<div>
			<h1>{pageID}</h1>
		</div>
	);
};

export default Page;
