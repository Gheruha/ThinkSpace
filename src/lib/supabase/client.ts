import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { createMiddlewareClient, createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

// Environment variables validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
	throw new Error(
		`Missing Supabase environment variables:
		- NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ?? 'undefined'}
		- NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseAnonKey ? 'set' : 'undefined'}
		- SUPABASE_SERVICE_ROLE_KEY: ${supabaseServiceRoleKey ? 'set' : 'undefined'}

		Make sure they are correctly set in your environment variables.`
	);
}

// Create a Supabase client for client-side use.
export const createSupabaseClientAnonymous: SupabaseClient = createClient(
	supabaseUrl,
	supabaseAnonKey
);

// Create a Supabase client for server-side use.
export const createSupabaseClientServiceRole = (): SupabaseClient => {
	return createClient(supabaseUrl, supabaseServiceRoleKey);
};

// Create a Supabase client for middleware use.
export const createSupabaseClientMiddleware = (
	req: NextRequest,
	res: NextResponse
): SupabaseClient => {
	return createMiddlewareClient({
		req,
		res
	});
};

// Create a Supabase client for API route or server-side use.
export const createSupabaseClientApi = async (): Promise<SupabaseClient> => {
	const cookieStore = cookies();
	return createRouteHandlerClient({
		cookies: () => cookieStore
	});
};
