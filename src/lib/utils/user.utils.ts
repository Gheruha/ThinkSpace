import {
	createSupabaseClientAnonymous,
	createSupabaseClientServiceRole
} from '@/lib/supabase/client';
import { User } from '@/types/user.type';

// Fetch the current user's details using the Supabase client
export const getCurrentUser = async (): Promise<User | null> => {
	const supabase = createSupabaseClientAnonymous;
	const {
		data: { user },
		error
	} = await supabase.auth.getUser();

	if (error) {
		console.error('Failed to fetch current user:', error.message);
		throw new Error(error.message || 'Unable to fetch user details');
	}

	if (!user) {
		console.error('User does not exist in getCurrentUser');
		return null;
	}

	const { id, email, user_metadata } = user;
	const mappedUser: User = {
		id,
		email: email || 'Unknown',
		firstName: user_metadata?.firstName || 'Unknown',
		lastName: user_metadata?.lastName || 'Unknown'
	};

	return mappedUser;
};

// Get the user data by email
export const getUserFromSupabaseByEmail = async (email: string): Promise<User | undefined> => {
	const supabaseServiceRole = createSupabaseClientServiceRole();
	const { data: users, error } = await supabaseServiceRole.auth.admin.listUsers();

	if (error || !users) {
		console.error('Failed to fetch user:', error?.message);
		throw new Error(error?.message || 'Error fetching users from the database.');
	}

	const user = users?.users.find((u) => u.email === email);
	return user;
};

// Check if user exist in Supabase database
export const checkUserExists = async (email: string): Promise<boolean> => {
	const supabaseServiceRole = createSupabaseClientServiceRole();
	const { data: users, error } = await supabaseServiceRole.auth.admin.listUsers();

	if (error || !users) {
		console.error('Failed to fetch user:', error?.message);
		throw new Error(error?.message || 'Error fetching users from the database.');
	}

	return users?.users.some((u) => u.email === email) ?? false;
};
