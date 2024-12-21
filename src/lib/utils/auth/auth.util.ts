import { createSupabaseApiClient, createClientSupabaseServiceRole } from '@/lib/supabase/client';
import { ForgotPasswordDto, SignUpDto } from '@/lib/dto/auth/auth.dto';
import { handleUserAuthentication } from '@/lib/store/auth/auth.store';
import { SignInDto } from '@/lib/dto/auth/auth.dto';
import { insertOTPCode } from './token.util';

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
export const signInUser = async ({ email, password }: SignInDto): Promise<any> => {
	const supabase = await createSupabaseApiClient();
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	if (error) {
		console.error('Error signing in:', error.message);
		throw new Error('Failed to sign in');
	}

	if (data?.user) {
		console.log('Response user data:', data.user);
		await handleUserAuthentication(data);
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
}: SignUpDto): Promise<any> => {
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

	if (data?.user) {
		console.log('Response user data:', data.user);
		await handleUserAuthentication(data);
	}

	return data;
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

// Send the OTP Code to user email
export const forgotPassword = async ({ email, otpCode }: ForgotPasswordDto): Promise<any> => {
	const supabase = await createSupabaseApiClient();

	const { error } = await supabase.functions.invoke('send-email', {
		body: { email: email, otp: otpCode }
	});

	if (error) {
		console.error('Error sending email:', error);
		throw new Error('Failed to send email to User');
	}
};
