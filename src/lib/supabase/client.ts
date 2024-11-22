import { NextRequest, NextResponse } from 'next/server';
import { cookies as getCookies } from 'next/headers';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { createClient } from '@supabase/supabase-js';
import { createMiddlewareClient, createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

// Environment variables validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error(
		'Missing Supabase environment variables. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.'
	);
}

// Create a Supabase client for client-side use.
export const createSupabaseClient = () => {
	return createClient(supabaseUrl, supabaseAnonKey);
};

// Create a Supabase client for middleware use.
export const createMiddlewareSupabaseClient = (req: NextRequest, res: NextResponse) => {
	return createMiddlewareClient({ req, res });
};

// Create a Supabase client for API route or server-side use.
export const createRouteSupabaseClient = () => {
	return createRouteHandlerClient({
		cookies: getCookies as () => ReadonlyRequestCookies
	});
};
