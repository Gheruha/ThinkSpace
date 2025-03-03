import { User } from '@/lib/dto/auth/auth.dto';
import { createClientSupabaseAnonymous } from '@/lib/supabase/client';
import { createClientSupabaseServiceRole } from '@/lib/supabase/client';

// Fetch the current user's details using the Supabase client
export const getCurrentUser = async (): Promise<User | null> => {
	const supabase = createClientSupabaseAnonymous;
	const {
		data: { user },
		error
	} = await supabase.auth.getUser();

	if (error) {
		console.error('Failed to fetch current user:', error.message);
		throw new Error('Unable to fetch user details');
	}

	if (!user) {
		console.error('User does not exist in getCurrentUser');
		return null;
	}

	const { id, email, user_metadata } = user;

	// Map the Supabase user object to match the User interface
	const mappedUser: User = {
		id,
		email: email || 'Unknown',
		firstName: user_metadata?.firstName || 'Unknown',
		lastName: user_metadata?.lastName || 'Unknown'
	};

	return mappedUser;
};

// some function
export const getUserFromSupabaseByEmail = async (email: string): Promise<any> => {
	const supabaseServiceRole = createClientSupabaseServiceRole();
	const { data: users, error } = await supabaseServiceRole.auth.admin.listUsers();

	if (error || !users) {
		console.error('Failed to fetch user:', error?.message);
		throw new Error('Error fetching users from the database.');
	}

	const user = users?.users.find((u) => u.email === email);
	return user;
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
