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

export default useAuthStore;
