import { NextRequest, NextResponse } from 'next/server';
import { createNewPage } from '@/lib/utils/workspace/workspace.utils';
export async function POST(req: NextRequest) {
	try {
		// Getting the request data
		const { title } = await req.json();

		// Checking if there is no title or the type is not string
		if (!title || typeof title !== 'string') {
			return NextResponse.json({ error: 'Invalid Title.' }, { status: 400 });
		}

		// Passing the data and calling the utils function
		const data = await createNewPage({ title });

		return NextResponse.json(data, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 400 });
	}
}
