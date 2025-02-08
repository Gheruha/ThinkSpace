import { User } from '@/lib/dto/auth/auth.dto';

export const mapUserData = async (responseData: any): Promise<User> => {
	const user = responseData;

	return {
		id: user.id,
		email: user.email || '',
		firstName: user.user_metadata?.firstName || '',
		lastName: user.user_metadata?.lastName || ''
	};
};

// export default useAuthStore;
