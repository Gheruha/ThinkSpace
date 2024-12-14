import { createClientSupabaseAnonymous } from '@/lib/supabase/client';
import { createSupabaseApiClient } from '@/lib/supabase/client';
import { signUpDto } from '@/lib/dto/auth/auth.dto';
import { clearToken } from './token.util';

// Exchanges an authorization code for a Supabase session
export const exchangeCodeForSession = async (code: string): Promise<void> => {
	const supabase = createSupabaseApiClient();
	const { data, error } = await supabase.auth.exchangeCodeForSession(code);

	if (error) {
		console.error('Error exchanging code for session:', error.message);
		throw new Error('Failed to exchange code for session');
	}

	// if (data?.session?.access_token) {
	// 	await saveToken(data.session.access_token);
	// }
};

// Sign in the user
export const signInUser = async (email: string, password: string): Promise<any> => {
	const supabase = createSupabaseApiClient();
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	if (error) {
		console.error('Error signing in:', error.message);
		throw new Error('Failed to sign in');
	}

	return data;
};

// Sign up the user
export const signUpUser = async ({
	firstName,
	lastName,
	email,
	password,
	redirectUrl
}: signUpDto): Promise<{ user: any; message: string }> => {
	const supabase = createSupabaseApiClient();
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: { firstName, lastName },
			emailRedirectTo: redirectUrl
		}
	});

	if (error) {
		console.error('Error signing up:', error.message);
		throw new Error('Failed to sign up');
	}

	return {
		user: data.user,
		message: 'Sign up successful. Please verify your email.'
	};
};

// Sign out the current user and clear their session
export const signOutUser = async (): Promise<void> => {
	const supabase = createClientSupabaseAnonymous();
	const { error } = await supabase.auth.signOut();

	if (error) {
		console.error('Error signing out:', error.message);
		throw new Error('Failed to sign out');
	}

	clearToken();
};
