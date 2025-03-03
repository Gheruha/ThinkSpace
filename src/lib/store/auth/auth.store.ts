import { User } from '@/lib/dto/auth/auth.dto';

export const mapUserData = async (responseData: any): Promise<User> => {
	return {
		id: responseData.id,
		email: responseData.email ?? '',
		firstName: responseData.user_metadata?.firstName ?? '',
		lastName: responseData.user_metadata?.lastName ?? ''
	};
};
