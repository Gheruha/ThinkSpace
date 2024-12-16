import { createClientSupabaseAnonymous } from '@/lib/supabase/client';
import { createClientSupabaseServiceRole } from '@/lib/supabase/client';

const TOKEN_KEY = 'supabase.auth.token';

// Get the user's current access token from localStorage
// export const getToken = (): string | null => {
// 	const storedData = localStorage.getItem(TOKEN_KEY);
// 	if (!storedData) return null;

// 	try {
// 		const { access_token } = JSON.parse(storedData);
// 		return access_token || null;
// 	} catch (error) {
// 		console.error('Failed to parse token:', error);
// 		return null;
// 	}
// };

// Save the user's access token in localStorage
// export const saveToken = async (token: string): Promise<void> => {
// 	localStorage.setItem(TOKEN_KEY, JSON.stringify({ access_token: token }));
// };

// Clear the user's access token from localStorage
// export const clearToken = (): void => {
// 	localStorage.removeItem(TOKEN_KEY);
// };

// Refresh the user's session and update the token in localStorage
// export const refreshToken = async (): Promise<void> => {
// 	const supabase = createClientSupabaseAnonymous();
// 	const { data, error } = await supabase.auth.refreshSession();

// 	if (error) {
// 		console.error('Error refreshing session:', error.message);
// 		throw new Error('Failed to refresh session');
// 	}

// 	if (data?.session) {
// 		localStorage.setItem(TOKEN_KEY, JSON.stringify(data.session));
// 	}
// };

// Fetch the current user's details using the Supabase client
export const fetchCurrentUser = async (): Promise<any> => {
	const supabase = createClientSupabaseAnonymous();
	const { data, error } = await supabase.auth.getUser();

	if (error) {
		console.error('Failed to fetch user:', error.message);
		throw new Error('Unable to fetch user details');
	}

	return data.user;
};

// Check if user exist in Supabase database
export const checkUserExists = async (email: string): Promise<boolean> => {
	const supabaseServiceRole = createClientSupabaseServiceRole();
	const { data: users, error } = await supabaseServiceRole.auth.admin.listUsers();

	if (error || !users) {
		console.error('Failed to fetch user:', error?.message);
		throw new Error('Error fetching users from the database.');
	}

	const user = users?.users.find((u) => u.email === email);
	return !!user;
};
