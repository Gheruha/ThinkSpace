import { createSupabaseApiClient } from '@/lib/supabase/client';
import { signUpDto } from '@/lib/dto/auth/auth.dto';
import { handleUserSignIn } from '@/lib/store/auth/auth.store';
import { signInDto } from '@/lib/dto/auth/auth.dto';

// Exchanges an authorization code for a Supabase session
export const exchangeCodeForSession = async (code: string): Promise<void> => {
	const supabase = await createSupabaseApiClient();
	const { error } = await supabase.auth.exchangeCodeForSession(code);

	if (error) {
		console.error('Error exchanging code for session:', error.message);
		throw new Error('Failed to exchange code for session');
	}
};

// Sign in the user
export const signInUser = async ({ email, password }: signInDto): Promise<any> => {
	const supabase = await createSupabaseApiClient();
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	if (error) {
		console.error('Error signing in:', error.message);
		throw new Error('Failed to sign in');
	}

	if (data?.session?.user) {
		console.log('Response user data:', data.session.user);
		await handleUserSignIn(data.session);
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
	const supabase = await createSupabaseApiClient();
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
	const supabase = await createSupabaseApiClient();
	const { error } = await supabase.auth.signOut();

	if (error) {
		console.error('Error signing out:', error.message);
		throw new Error('Failed to sign out');
	}
};
