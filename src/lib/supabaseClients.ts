import { createClient } from '@supabase/supabase-js';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { cookies as getCookies } from 'next/headers';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const getSupabaseClient = () => createClient(supabaseUrl, supabaseAnonKey);

export const getMiddlewareSupabaseClient = (req: NextRequest, res: NextResponse) =>
	createMiddlewareClient({ req, res });

export const getRouteHandlerSupabaseClient = () =>
	createRouteHandlerClient({
		cookies: getCookies as () => ReadonlyRequestCookies
	});
