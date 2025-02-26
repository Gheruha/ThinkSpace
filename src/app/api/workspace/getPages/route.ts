import { NextRequest, NextResponse } from 'next/server';
import { getPages } from '@/lib/utils/workspace/workspace.utils';

export async function GET(req: NextRequest) {
	try {
		const data = await getPages();

		return NextResponse.json(data, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ error: err }, { status: 404 });
	}
}
