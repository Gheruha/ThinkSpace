import { User } from '@/types/user.type';

export interface UserResponse {
	id: string;
	email?: string;
	user_metadata?: {
		firstName?: string;
		lastName?: string;
	};
}

export const mapUserData = async (responseData: UserResponse): Promise<User> => {
	return {
		id: responseData.id,
		email: responseData.email || '',
		firstName: responseData.user_metadata?.firstName || '',
		lastName: responseData.user_metadata?.lastName || ''
	};
};
