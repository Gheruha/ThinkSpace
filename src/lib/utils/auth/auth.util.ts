import { createSupabaseApiClient } from '@/lib/supabase/client';
import { ForgotPasswordDto, SignUpDto, User, VerifyOTPDto } from '@/lib/dto/auth/auth.dto';
import { mapUserData } from '@/lib/store/auth/auth.store';
import { SignInDto } from '@/lib/dto/auth/auth.dto';
import { getUserFromSupabaseByEmail } from '@/lib/utils/auth/token.util';

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
		await mapUserData(data);
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
		await mapUserData(data);
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
export const signInUserWithOtp = async ({ email }: ForgotPasswordDto): Promise<User | null> => {
	const supabase = await createSupabaseApiClient();

	const { error } = await supabase.auth.signInWithOtp({ email });
	if (error) {
		console.error('Error sending email:', error);
		throw new Error('Failed to send email to User');
	}

	const user = await getUserFromSupabaseByEmail(email);
	if (user) {
		const userData = await mapUserData(user);
		return userData;
	}

	console.error('User not found in Supabase');
	return null;
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
		throw new Error('Failed to verify Otp');
	}
};
