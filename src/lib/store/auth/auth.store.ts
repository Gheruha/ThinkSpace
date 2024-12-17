import { create } from 'zustand';
import { User } from '@/lib/dto/auth/auth.dto';

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	setUser: (user: User) => void;
	clearUser: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
	user: null,
	isAuthenticated: false,
	setUser: (user) => set({ user, isAuthenticated: true }),
	clearUser: () => set({ isAuthenticated: false })
}));

export const handleUserAuthentication = async (responseData: any) => {
	const { user } = responseData;
	const mappedUser: User = {
		id: user?.id,
		email: user?.user_metadata?.email,
		firstName: user?.user_metadata?.firstName,
		lastName: user?.user_metadata?.lastName
	};

	const setUser = useAuthStore.getState().setUser;
	setUser(mappedUser);

	console.log('User after setUser:', useAuthStore.getState().user);
};

export default useAuthStore;
