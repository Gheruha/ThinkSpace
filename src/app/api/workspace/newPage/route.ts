import { createClientSupabaseAnonymous } from '@/lib/supabase/client';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
	const formData = await req.formData();
	const title = String(formData.get('title'));

	console.log(title);
}
