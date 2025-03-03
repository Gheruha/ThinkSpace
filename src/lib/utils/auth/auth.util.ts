import { Session } from '@supabase/supabase-js';
import { createSupabaseApiClient } from '@/lib/supabase/client';
import { mapUserData } from '@/lib/store/auth/auth.store';
import { getUserFromSupabaseByEmail } from '@/lib/utils/auth/token.util';
import {
	SignInDto,
	SignUpDto,
	SignInWithOtpDto,
	User,
	VerifyOTPDto,
	ResetPasswordDto
} from '@/lib/dto/auth/auth.dto';

// Exchanges an authorization code for a Supabase session
export const authenticateWithCode = async (code: string): Promise<void> => {
	const supabase = await createSupabaseApiClient();
	const { error } = await supabase.auth.exchangeCodeForSession(code);

	if (error) {
		console.error('Error exchanging code for session:', error.message);
		throw new Error(error.message || 'Failed to exchange code for session');
	}
};

// Sign in the user
export const signInUser = async ({ email, password }: SignInDto): Promise<Session> => {
	const supabase = await createSupabaseApiClient();
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	if (error) {
		console.error('Error signing in:', error.message);
		throw new Error(error.message || 'Failed to sign in');
	}

	await mapUserData(data.user);

	return data.session;
};

// Sign up the user
export const signUpUser = async ({
	firstName,
	lastName,
	email,
	password,
	redirectUrl
}: SignUpDto): Promise<Session | null> => {
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
		throw new Error(error.message || 'Failed to sign up');
	}

	await mapUserData(data.user);

	return data.session;
};

// Sign out the current user and clear their session
export const signOutUser = async (): Promise<void> => {
	const supabase = await createSupabaseApiClient();
	const { error } = await supabase.auth.signOut();

	if (error) {
		console.error('Error signing out:', error.message);
		throw new Error(error.message || 'Failed to sign out');
	}
};

// Send the OTP Code to user email
export const signInUserWithOtp = async ({ email }: SignInWithOtpDto): Promise<User | null> => {
	const supabase = await createSupabaseApiClient();

	const { error } = await supabase.auth.signInWithOtp({ email });
	if (error) {
		console.error('Error sending email:', error);
		throw new Error(error.message || 'Failed to send email to User');
	}

	const user = await getUserFromSupabaseByEmail(email);
	return user ? mapUserData(user) : null;
};

// Verify the OTP Code
export const verifyUserOtp = async ({ email, otpCode }: VerifyOTPDto): Promise<void> => {
	const supabase = await createSupabaseApiClient();

	const { error } = await supabase.auth.verifyOtp({
		email: email as string,
		token: otpCode,
		type: 'email'
	});

	if (error) {
		console.error('Error verifing otp:', error);
		throw new Error(error.message || 'Failed to verify Otp');
	}
};

export const resetUserPassword = async ({ password }: ResetPasswordDto): Promise<void> => {
	const supabase = await createSupabaseApiClient();

	const { error } = await supabase.auth.updateUser({ password });

	if (error) {
		console.error('Error reseting password:', error);
		throw new Error(error.message || 'Failed to reset password');
	}
};

export const signInUserWithOAuth = async (url: URL): Promise<string> => {
	const supabase = await createSupabaseApiClient();

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${url.origin}/api/auth/callback`
		}
	});

	if (error) {
		console.error('Error initiating Google sign-in:', error.message);
		throw new Error(error.message || 'Failed to initialing Google sign-in');
	}

	return data.url;
};
