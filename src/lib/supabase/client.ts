import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { createMiddlewareClient, createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

// Environment variables validation
const supabaseUrl: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey: string | undefined = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
	throw new Error(
		'Missing Supabase environment variables. Ensure NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY are set.'
	);
}

// Create a Supabase client for client-side use.
export const createClientSupabaseAnonymous = () => {
	return createClient(supabaseUrl, supabaseAnonKey);
};

// Create a Supabase client for server-side use.
export const createClientSupabaseServiceRole = () => {
	return createClient(supabaseUrl, supabaseServiceRoleKey);
};

// Create a Supabase client for middleware use.
export const createSupabaseMiddlewareClient = (req: NextRequest, res: NextResponse) => {
	return createMiddlewareClient({
		req,
		res
	});
};

// Create a Supabase client for API route or server-side use.
export const createSupabaseApiClient = async () => {
	const cookieStore = cookies();
	return createRouteHandlerClient({
		cookies: () => cookieStore
	});
};
