import { PageDto } from '@/lib/dto/workspace/workspace.dto';
import { createSupabaseApiClient } from '@/lib/supabase/client';
import { SupabaseClient, Session } from '@supabase/supabase-js';

export const getSession = async (supabase: SupabaseClient): Promise<Session | null> => {
	const { data, error } = await supabase.auth.getSession();
	if (error) {
		console.error('Error fetching session:', error);
		return null;
	}
	return data.session;
};

// Creates a new page into the database
export const createNewPage = async ({ title }: PageDto): Promise<any> => {
	// Create supabase api client
	const supabase = await createSupabaseApiClient();

	// Retrieve the session
	const session = await getSession(supabase);
	if (!session) {
		throw new Error('No session found');
	}

	// Get userId
	const userId = session?.user.id;

	// Inserting default data into the database
	const { data, error } = await supabase.from('Page').insert([{ Title: title, user_id: userId }]);

	if (error) {
		console.error('Error while making a new page', error.message);
		throw new Error('Failed to make a new page');
	}

	return data;
};

// Getting all the pages from the database
export const getPages = async (): Promise<any> => {
	// Create supabase api client
	const supabase = await createSupabaseApiClient();

	// Getting the session
	const session = await getSession(supabase);

	// Store the usedId
	const userId = session?.user.id;

	// Query the "Page" table for records belonging to the current user
	const { data: pages } = await supabase
		.from('Page')
		.select('id, Title, created_at')
		.eq('user_id', userId);

	return pages;
};
